import useCanvasRecordQuery from "@/apis/canvas/useCanvasRecordQuery";
import Canvas from "@/features/canvas/Canvas";
import { createRef, useState } from "react";
import {
  CanvasPath,
  ReactSketchCanvas,
  ReactSketchCanvasProps,
  ReactSketchCanvasRef,
} from "react-sketch-canvas";

type Handlers = [string, () => void, string][];

// 메인 캔버스
export default function CanvasTest() {
  const [canvasProps, setCanvasProps] = useState<Partial<ReactSketchCanvasProps>>({
    className: "workbook-canvas",
    width: "60vw",
    height: "40vw",
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

  const inputProps: Array<[keyof ReactSketchCanvasProps, "text" | "number"]> = [
    ["strokeWidth", "number"],
    ["eraserWidth", "number"],
  ];

  const canvasRef = createRef<ReactSketchCanvasRef>();

  const [allPaths, setAllPaths] = useState<CanvasPath[]>([]);
  const [lastStroke, setLastStroke] = useState<{
    stroke: CanvasPath | null;
    isEraser: boolean | null;
  }>({ stroke: null, isEraser: null });
  const [pathsToLoad, setPathsToLoad] = useState<string>("");

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

  const resetCanvasHandler = () => {
    const resetCanvas = canvasRef.current?.resetCanvas;

    if (resetCanvas) {
      resetCanvas();
    }
  };

  const createButton = (label: string, handler: () => void, themeColor: string) => (
    <button
      key={label}
      className={`btn btn-${themeColor} btn-block`}
      type="button"
      onClick={handler}
    >
      {label}
    </button>
  );

  const buttonsWithHandlers: Handlers = [
    ["Undo", undoHandler, "primary"],
    ["Redo", redoHandler, "primary"],
    ["Clear All", clearHandler, "primary"],
    ["Reset All", resetCanvasHandler, "primary"],
    ["Pen", penHandler, "secondary"],
    ["Eraser", eraserHandler, "secondary"],
  ];

  // const onChange = (updatedPaths: CanvasPath[]): void => {
  //   setPaths(updatedPaths);
  // };
  const studentStudyProblemId = 1;

  console.log("allPaths", allPaths);

  // const record = useCanvasRecordQuery(studentStudyProblemId).data;

  return (
    <main>
      {/* <Canvas storedData={record?.line} /> */}
      <Canvas allPaths={allPaths} setAllPaths={setAllPaths} />
      <img src="/images/test.png" alt="" />
      {/* <CanvasPen canvasProps={canvasProps} setCanvasProps={setCanvasProps} />
      <CanvasHighlighter canvasProps={canvasProps} setCanvasProps={setCanvasProps} />
      <CanvasRecode canvasProps={canvasProps} setCanvasProps={setCanvasProps} />
      <div className="row">
        <form>
          {inputProps.map(([fieldName, type]) => (
            <CanvasInput
              key={fieldName}
              fieldName={fieldName}
              type={type}
              canvasProps={canvasProps}
              setCanvasProps={setCanvasProps}
            />
          ))}
        </form>

        <section className="row no-gutters canvas-area m-0 p-0">
          <div className="col-9 canvas p-0">
            <ReactSketchCanvas
              ref={canvasRef}
              onChange={onChange}
              onStroke={(stroke, isEraser) => setLastStroke({ stroke, isEraser })}
              {...canvasProps}
            />
          </div>
          <div className="col-3 panel">
            <div className="d-grid gap-2">
              {buttonsWithHandlers.map(([label, handler, themeColor]) =>
                createButton(label, handler, themeColor),
              )}
            </div>
          </div>
        </section>

        <section className="row image-export mt-5 p-3 justify-content-center align-items-start">
          <div className="col-5 row form-group">
            <div className="p-2">
              <label className="col-12" htmlFor="paths">
                Paths
              </label>
              <textarea
                id="paths"
                className="dataURICode col-12"
                style={{ width: "800px", height: "500px" }}
                readOnly
                rows={10}
                value={paths.length !== 0 ? JSON.stringify(paths, null, 2) : "Sketch to get paths"}
              />
            </div>
            <div className="p-2">
              <label className="col-12" htmlFor="last-stroke">
                Last stroke
                {lastStroke.isEraser !== null && ":" + (lastStroke.isEraser ? "Eraser" : "Pen")}
              </label>
              <textarea
                id="last-stroke"
                className="dataURICode col-12"
                readOnly
                rows={10}
                value={
                  lastStroke.stroke !== null
                    ? JSON.stringify(lastStroke.stroke, null, 2)
                    : "Sketch to get the last stroke"
                }
              />
            </div>
          </div>
          <div className="p-2 col-10">
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
          </div>
        </section>
      </div> */}
    </main>
  );
}
