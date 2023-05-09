import { createRef, useEffect, useState } from "react";
import {
  CanvasPath,
  ReactSketchCanvas,
  ReactSketchCanvasProps,
  ReactSketchCanvasRef,
} from "react-sketch-canvas";
import CanvasBar from "./CanvasBar";
import { CanvasDrawSection } from "./Canvas.style";

interface StoredData {
  drawMode: boolean;
  strokeColor: string;
  strokeWidth: number;
  paths: {
    x: number;
    y: number;
  }[];
}
interface Iprops {
  storedData?: StoredData[];
  allPaths?: CanvasPath[];
  setAllPaths: (allPaths: CanvasPath[]) => void;
  isOpenCanvas: boolean;
  setIsOpenCanvas: (type: boolean) => void;
}

export default function Canvas({
  storedData,
  allPaths,
  setAllPaths,
  isOpenCanvas,
  setIsOpenCanvas,
}: Iprops) {
  const canvasRef = createRef<ReactSketchCanvasRef>();

  const [nowTab, setNowTab] = useState<string>("");

  const [canvasProps, setCanvasProps] = useState<Partial<ReactSketchCanvasProps>>({
    className: "workbook-canvas",
    width: "70vw",
    height: "calc(100vh - 13.5rem)",
    backgroundImage: "",
    preserveBackgroundImageAspectRatio: "none",
    strokeWidth: 4,
    eraserWidth: 5,
    strokeColor: "#000000",
    canvasColor: "rgba(255,255,255, 0)",
    style: { backgroundColor: "rgba(255,255,255, 0)" },
    exportWithBackgroundImage: false,
    // withTimestamp: true,
    allowOnlyPointerType: "all",
  });

  const [lastStroke, setLastStroke] = useState<{
    stroke: CanvasPath | null;
    isEraser: boolean | null;
  }>({ stroke: null, isEraser: null });

  const onChange = (updatedPaths: CanvasPath[]): void => {
    setAllPaths(updatedPaths);
  };

  const penHandler = () => {
    const eraseMode = canvasRef.current?.eraseMode;

    if (eraseMode) {
      eraseMode(false);
    }
  };

  const eraserHandler = () => {
    const eraseMode = canvasRef.current?.eraseMode;

    if (eraseMode) {
      eraseMode(true);
    }
  };

  const undoHandler = () => {
    const undo = canvasRef.current?.undo;

    if (undo) {
      undo();
    }
  };

  const redoHandler = () => {
    const redo = canvasRef.current?.redo;

    if (redo) {
      redo();
    }
  };

  const clearHandler = () => {
    const clearCanvas = canvasRef.current?.clearCanvas;

    if (clearCanvas) {
      clearCanvas();
    }
  };

  const ControlCanvas = () => {
    // 캔버스 닫기
    setIsOpenCanvas(!isOpenCanvas);
  };

  useEffect(() => {
    if ((allPaths?.length as number) > 0) {
      canvasRef.current?.loadPaths(allPaths as CanvasPath[]);
      return;
    }
    if (storedData) {
      canvasRef.current?.loadPaths(storedData);
    }
  }, [isOpenCanvas]);

  return (
    <>
      <CanvasBar
        canvasProps={canvasProps}
        setCanvasProps={setCanvasProps}
        penHandler={penHandler}
        eraserHandler={eraserHandler}
        undoHandler={undoHandler}
        redoHandler={redoHandler}
        clearHandler={clearHandler}
        ControlCanvas={ControlCanvas}
        isOpenCanvas={isOpenCanvas}
        nowTab={nowTab}
        setNowTab={setNowTab}
      />
      {isOpenCanvas && (
        <CanvasDrawSection nowTab={nowTab}>
          <ReactSketchCanvas
            ref={canvasRef}
            onChange={onChange}
            onStroke={(stroke, isEraser) => setLastStroke({ stroke, isEraser })}
            {...canvasProps}
          />
        </CanvasDrawSection>
      )}
    </>
  );
}
