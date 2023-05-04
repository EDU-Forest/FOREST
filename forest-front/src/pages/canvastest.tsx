import Canvas from "@/features/canvas/Canvas";
import { createRef, useState } from "react";
import {
  CanvasPath,
  ReactSketchCanvas,
  ReactSketchCanvasProps,
  ReactSketchCanvasRef,
} from "react-sketch-canvas";

type Handlers = [string, () => void, string][];

const dummy = [
  {
    drawMode: true,
    strokeColor: "rgba(250, 255, 0, 0.2)",
    strokeWidth: 10,
    paths: [
      {
        x: 154.40000915527344,
        y: 333,
      },
      {
        x: 156.8000030517578,
        y: 329.79998779296875,
      },
      {
        x: 164,
        y: 323.4000244140625,
      },
      {
        x: 187.1999969482422,
        y: 305,
      },
      {
        x: 215.1999969482422,
        y: 285.8000183105469,
      },
      {
        x: 228.8000030517578,
        y: 275.3999938964844,
      },
      {
        x: 240,
        y: 269.8000183105469,
      },
      {
        x: 249.60000610351562,
        y: 265.8000183105469,
      },
      {
        x: 251.1999969482422,
        y: 265,
      },
      {
        x: 251.1999969482422,
        y: 269,
      },
      {
        x: 251.1999969482422,
        y: 278.6000671386719,
      },
      {
        x: 251.1999969482422,
        y: 290.6000671386719,
      },
      {
        x: 246.40000915527344,
        y: 337.79998779296875,
      },
      {
        x: 243.1999969482422,
        y: 365.79998779296875,
      },
      {
        x: 240,
        y: 394.60003662109375,
      },
      {
        x: 240,
        y: 419.4000244140625,
      },
      {
        x: 240,
        y: 441,
      },
      {
        x: 245.60000610351562,
        y: 469.79998779296875,
      },
      {
        x: 251.1999969482422,
        y: 479.4000244140625,
      },
      {
        x: 255.1999969482422,
        y: 484.20001220703125,
      },
      {
        x: 257.6000061035156,
        y: 485.79998779296875,
      },
      {
        x: 260,
        y: 486.60003662109375,
      },
      {
        x: 272.8000183105469,
        y: 477.79998779296875,
      },
      {
        x: 300.8000183105469,
        y: 457,
      },
      {
        x: 360.8000183105469,
        y: 417,
      },
      {
        x: 428,
        y: 373,
      },
      {
        x: 488,
        y: 332.20001220703125,
      },
      {
        x: 521.6000366210938,
        y: 309,
      },
      {
        x: 534.4000244140625,
        y: 301,
      },
      {
        x: 535.2000122070312,
        y: 301,
      },
      {
        x: 535.2000122070312,
        y: 317,
      },
      {
        x: 535.2000122070312,
        y: 335.4000244140625,
      },
      {
        x: 535.2000122070312,
        y: 354.60003662109375,
      },
      {
        x: 535.2000122070312,
        y: 414.60003662109375,
      },
      {
        x: 544.7999877929688,
        y: 474.60003662109375,
      },
      {
        x: 558.4000244140625,
        y: 502.60003662109375,
      },
      {
        x: 568.7999877929688,
        y: 517,
      },
      {
        x: 580.7999877929688,
        y: 517,
      },
      {
        x: 591.2000122070312,
        y: 509,
      },
      {
        x: 604,
        y: 499.4000244140625,
      },
      {
        x: 648.7999877929688,
        y: 464.20001220703125,
      },
      {
        x: 673.6000366210938,
        y: 445.79998779296875,
      },
      {
        x: 688.7999877929688,
        y: 433.79998779296875,
      },
      {
        x: 719.2000122070312,
        y: 408.20001220703125,
      },
      {
        x: 752,
        y: 382.60003662109375,
      },
      {
        x: 816.7999877929688,
        y: 327.4000244140625,
      },
      {
        x: 860.7999877929688,
        y: 287.3999938964844,
      },
      {
        x: 876,
        y: 268.20001220703125,
      },
      {
        x: 878.4000244140625,
        y: 264.20001220703125,
      },
      {
        x: 878.4000244140625,
        y: 266.6000671386719,
      },
      {
        x: 878.4000244140625,
        y: 284.20001220703125,
      },
      {
        x: 878.4000244140625,
        y: 346.60003662109375,
      },
      {
        x: 899.2000122070312,
        y: 414.60003662109375,
      },
      {
        x: 933.6000366210938,
        y: 461,
      },
      {
        x: 956.7999877929688,
        y: 471.4000244140625,
      },
      {
        x: 984.7999877929688,
        y: 463.4000244140625,
      },
      {
        x: 996,
        y: 453.79998779296875,
      },
      {
        x: 1004.7999877929688,
        y: 445,
      },
      {
        x: 1017.6000366210938,
        y: 430.60003662109375,
      },
      {
        x: 1020.7999877929688,
        y: 421.79998779296875,
      },
      {
        x: 1014.4000244140625,
        y: 352.20001220703125,
      },
      {
        x: 1001.6000366210938,
        y: 329,
      },
      {
        x: 979.2000122070312,
        y: 301,
      },
      {
        x: 932.7999877929688,
        y: 257.8000183105469,
      },
      {
        x: 858.4000244140625,
        y: 217,
      },
      {
        x: 758.4000244140625,
        y: 189.80001831054688,
      },
      {
        x: 656.7999877929688,
        y: 181.80001831054688,
      },
      {
        x: 552,
        y: 185,
      },
      {
        x: 455.20001220703125,
        y: 210.60000610351562,
      },
      {
        x: 384.8000183105469,
        y: 245,
      },
      {
        x: 358.3999938964844,
        y: 263.3999938964844,
      },
      {
        x: 351.20001220703125,
        y: 280.20001220703125,
      },
      {
        x: 351.20001220703125,
        y: 293,
      },
      {
        x: 352.8000183105469,
        y: 299.3999938964844,
      },
      {
        x: 355.20001220703125,
        y: 301,
      },
      {
        x: 362.3999938964844,
        y: 301,
      },
      {
        x: 366.3999938964844,
        y: 299.3999938964844,
      },
      {
        x: 375.20001220703125,
        y: 293.8000183105469,
      },
      {
        x: 390.3999938964844,
        y: 280.20001220703125,
      },
      {
        x: 396.8000183105469,
        y: 269,
      },
      {
        x: 400,
        y: 253,
      },
      {
        x: 400,
        y: 240.20001220703125,
      },
      {
        x: 388.8000183105469,
        y: 223.39999389648438,
      },
      {
        x: 368,
        y: 211.39999389648438,
      },
      {
        x: 333.6000061035156,
        y: 211.39999389648438,
      },
      {
        x: 299.20001220703125,
        y: 232.20001220703125,
      },
      {
        x: 274.3999938964844,
        y: 251.39999389648438,
      },
      {
        x: 265.6000061035156,
        y: 265,
      },
      {
        x: 261.6000061035156,
        y: 273.8000183105469,
      },
      {
        x: 261.6000061035156,
        y: 280.20001220703125,
      },
      {
        x: 262.3999938964844,
        y: 282.6000671386719,
      },
      {
        x: 274.3999938964844,
        y: 282.6000671386719,
      },
      {
        x: 294.3999938964844,
        y: 273,
      },
      {
        x: 311.20001220703125,
        y: 263.3999938964844,
      },
      {
        x: 324.8000183105469,
        y: 253,
      },
      {
        x: 332,
        y: 244.20001220703125,
      },
      {
        x: 335.20001220703125,
        y: 240.20001220703125,
      },
      {
        x: 336,
        y: 236.20001220703125,
      },
      {
        x: 336.8000183105469,
        y: 230.60000610351562,
      },
    ],
  },
];

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

  const [paths, setPaths] = useState<CanvasPath[]>([]);
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

  const onChange = (updatedPaths: CanvasPath[]): void => {
    setPaths(updatedPaths);
  };

  return (
    <main>
      <Canvas storedData={dummy} />
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
