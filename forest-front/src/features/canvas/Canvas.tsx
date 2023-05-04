import { createRef, useEffect, useState } from "react";
import {
  CanvasPath,
  ReactSketchCanvas,
  ReactSketchCanvasProps,
  ReactSketchCanvasRef,
} from "react-sketch-canvas";
import CanvasBar from "./CanvasBar";
import { CanvasBarClose, CanvasDrawSection } from "./Canvas.style";

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
}

export default function Canvas({ storedData }: Iprops) {
  const canvasRef = createRef<ReactSketchCanvasRef>();

  const [canvasProps, setCanvasProps] = useState<Partial<ReactSketchCanvasProps>>({
    className: "workbook-canvas",
    width: "100vw",
    height: "80vw",
    backgroundImage: "images/test.png",
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

  const [paths, setPaths] = useState<CanvasPath[]>([]);
  const [lastStroke, setLastStroke] = useState<{
    stroke: CanvasPath | null;
    isEraser: boolean | null;
  }>({ stroke: null, isEraser: null });
  const [pathsToLoad, setPathsToLoad] = useState<string>("");

  const [isOpenCanvas, setIsOpenCanvas] = useState<boolean>(false);

  const onChange = (updatedPaths: CanvasPath[]): void => {
    setPaths(updatedPaths);
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

  const [exportData, setExportData] = useState<string>("");

  useEffect(() => {
    setExportData(JSON.stringify(paths, null, 2));
    // console.log("paths", paths);
    // paths.map((path) => console.log("path", path, "/", typeof path));
    // console.log(typeof exportData);
    // console.log("paths", paths);
  }, [paths]);

  useEffect(() => {
    // console.log("storedData", storedData);
    // console.log(typeof storedData);
    // const pathsToUpdate = JSON.parse(exportData);
    // console.log(pathsToUpdate);
    canvasRef.current?.loadPaths(storedData);
  }, [isOpenCanvas]);

  //   console.log("pathsToLoad", pathsToLoad);
  return (
    <>
      <CanvasBarClose>
        <img src="/icons/icon-72x72.png" style={{ width: "40px" }} onClick={ControlCanvas} />
      </CanvasBarClose>
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
      />

      {isOpenCanvas && (
        <CanvasDrawSection>
          <ReactSketchCanvas
            ref={canvasRef}
            onChange={onChange}
            onStroke={(stroke, isEraser) => setLastStroke({ stroke, isEraser })}
            {...canvasProps}
          />
        </CanvasDrawSection>
      )}
      <textarea
        id="paths"
        className="dataURICode col-12"
        style={{ width: "800px", height: "500px" }}
        readOnly
        rows={10}
        value={paths.length !== 0 ? JSON.stringify(paths, null, 2) : "Sketch to get paths"}
      />

      <label htmlFor="pathsToLoad" className="form-label">
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
      </button>
    </>
  );
}
