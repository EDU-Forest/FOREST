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
  storedData?: any;
  allPaths?: CanvasPath[];
  setAllPaths: (allPaths: CanvasPath[]) => void;
}

export default function Canvas({ storedData, allPaths, setAllPaths }: Iprops) {
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
  const [pathsToLoad, setPathsToLoad] = useState<string>("");

  const [isOpenCanvas, setIsOpenCanvas] = useState<boolean>(false);

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
    canvasRef.current?.loadPaths(allPaths as CanvasPath[]);
  }, [isOpenCanvas]);

  // API GET한 기록 그리기
  // useEffect(() => {
  //   canvasRef.current?.loadPaths(storedData);
  // }, [isOpenCanvas]);

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
      {/* <button onClick={gogo}>해보자!</button> */}

      {/* <label htmlFor="pathsToLoad" className="form-label">
        Paths to load
      </label>
      <textarea
        name="pathsToLoad"
        id="pathsToLoad"
        className="dataURICode col-12"
        rows={5}
        value={pathsToLoad}
        onChange={(e) => {
          setPathsToLoad(e.target.value);
        }}
      />
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          const pathsToUpdate = JSON.parse(pathsToLoad);

          canvasRef.current?.loadPaths(pathsToUpdate);
        }}
      >
        Load Paths
      </button> */}
    </>
  );
}
