import { createRef, useEffect, useState } from "react";
import {
  CanvasPath,
  ReactSketchCanvas,
  ReactSketchCanvasProps,
  ReactSketchCanvasRef,
} from "react-sketch-canvas";
import CanvasBar from "./CanvasBar";
import { CanvasDrawSection } from "./Canvas.style";
import { useDispatch, useSelector } from "react-redux";
import { controlCanvas, setPaths } from "@/stores/exam/canvas";
import { RootState } from "@/stores/store";
import useCanvasPost from "@/apis/canvas/useCanvasPost";
import useCanvasRecordQuery from "@/apis/canvas/useCanvasRecordQuery";

export default function Canvas() {
  const dispatch = useDispatch();
  const canvasRef = createRef<ReactSketchCanvasRef>();
  const { paths, isOpenCanvas, studentStudyProblemId } = useSelector(
    (state: RootState) => state.canvas,
  );
  const { data: record, isSuccess } = useCanvasRecordQuery(studentStudyProblemId, isOpenCanvas);

  const { mutate: canvasMutate } = useCanvasPost();
  const [nowTab, setNowTab] = useState<string>("");

  const [canvasProps, setCanvasProps] = useState<Partial<ReactSketchCanvasProps>>({
    className: "workbook-canvas",
    width: "calc(78vw - 4rem)",
    height: "calc(100vh - 15rem)",
    backgroundImage: "",
    preserveBackgroundImageAspectRatio: "none",
    strokeWidth: 4,
    eraserWidth: 5,
    strokeColor: "#000000",
    canvasColor: "rgba(255,255,255, 0)",
    style: { backgroundColor: "rgba(255,255,255, 0)" },
    exportWithBackgroundImage: false,
    allowOnlyPointerType: "all",
  });

  const onChange = (updatedPaths: CanvasPath[]): void => {
    dispatch(setPaths(updatedPaths));
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
    dispatch(controlCanvas());
  };

  useEffect(() => {
    if (isSuccess && record) {
      canvasRef.current?.loadPaths(record.line);
    }
  }, [isSuccess, record]);

  useEffect(() => {
    if (!isOpenCanvas) {
      if (paths?.length > 0) {
        const canvasPayload = {
          studentStudyProblemId: studentStudyProblemId,
          line: paths,
        };
        canvasMutate(canvasPayload);
      }
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
        nowTab={nowTab}
        setNowTab={setNowTab}
      />
      {isOpenCanvas && (
        <CanvasDrawSection>
          <ReactSketchCanvas ref={canvasRef} onChange={onChange} {...canvasProps} />
        </CanvasDrawSection>
      )}
    </>
  );
}
