import { useEffect, useState } from "react";
import { CanvasBarWrapper } from "./Canvas.style";
import { BsPencilFill, BsFillEraserFill, BsTrash } from "react-icons/bs";
import { FaHighlighter } from "react-icons/fa";
import { BiUndo, BiRedo } from "react-icons/bi";
import CanvasPen from "./CanvasPen";
import CanvasHighlighter from "./CanvasHighlighter";
import { ReactSketchCanvasProps } from "react-sketch-canvas";
import CanvasEraser from "./CanvasEraser";

interface Iprops {
  canvasProps: Partial<ReactSketchCanvasProps>;
  setCanvasProps: React.Dispatch<React.SetStateAction<Partial<ReactSketchCanvasProps>>>;
  penHandler: () => void;
  eraserHandler: () => void;
  undoHandler: () => void;
  redoHandler: () => void;
  clearHandler: () => void;
  ControlCanvas: () => void;
  isOpenCanvas: boolean;
}

export default function CanvasBar({
  canvasProps,
  setCanvasProps,
  penHandler,
  eraserHandler,
  undoHandler,
  redoHandler,
  clearHandler,
  ControlCanvas,
  isOpenCanvas,
}: Iprops) {
  const [isOpenController, setIsOpenController] = useState<boolean>(false);
  const [isPen, setIsPen] = useState<boolean>(false);
  const [isHighlighter, setIsHighlighter] = useState<boolean>(false);
  const [isEraser, setIsEraser] = useState<boolean>(false);

  const [penColor, setPenColor] = useState<string>("#000000");
  const [penWidth, setPenWidth] = useState<number>(3);

  const [highlighterColor, setHighlighterColor] = useState<string>("rgba(250, 255, 0, 0.2)");
  const [highlighterWidth, setHighlighterWidth] = useState<number>(10);

  const [nowTab, setNowTab] = useState<string>("");

  const openPenController = () => {
    penHandler();
    setIsPen(!isPen);
    setIsHighlighter(false);
    setIsEraser(false);
    setIsOpenController(!isPen);

    setNowTab("pen");
  };
  const openHighliterController = () => {
    penHandler();
    setIsPen(false);
    setIsHighlighter(!isHighlighter);
    setIsEraser(false);
    setIsOpenController(!isHighlighter);

    setNowTab("highlighter");
  };

  const openEraserController = () => {
    eraserHandler();
    setIsPen(false);
    setIsHighlighter(false);
    setIsEraser(!isEraser);
    setIsOpenController(!isEraser);

    setNowTab("eraser");
  };

  const closeSelectors = () => {
    setIsPen(false);
    setIsHighlighter(false);
    setIsEraser(false);
    setIsOpenController(false);
  };

  const clickUndo = () => {
    undoHandler();
    closeSelectors();
  };

  const clickRedo = () => {
    redoHandler();
    closeSelectors();
  };

  const clickClear = () => {
    clearHandler();
    closeSelectors();
  };

  const changeStroke = (color: string, width: number) => {
    setCanvasProps((prevCanvasProps: Partial<ReactSketchCanvasProps>) => ({
      ...prevCanvasProps,
      strokeColor: color,
      strokeWidth: width,
    }));
  };

  useEffect(() => {
    if (!isOpenCanvas) {
      closeSelectors();
    }
  }, [isOpenCanvas]);

  useEffect(() => {
    if (isPen) {
      changeStroke(penColor, penWidth);
    } else {
      changeStroke(highlighterColor, highlighterWidth);
    }
  }, [isPen, isHighlighter, penColor, penWidth, highlighterColor, highlighterWidth]);

  return (
    <CanvasBarWrapper isOpenController={isOpenController} nowTab={nowTab}>
      <img src="/icons/icon-72x72.png" style={{ width: "40px" }} onClick={ControlCanvas} />
      <BsPencilFill onClick={openPenController} className="pen" />
      <FaHighlighter onClick={openHighliterController} className="highlighter" />
      <BsFillEraserFill onClick={openEraserController} className="eraser" />
      <BiUndo onClick={clickUndo} />
      <BiRedo onClick={clickRedo} />
      <BsTrash onClick={clickClear} />

      {isPen && (
        <CanvasPen
          color={penColor}
          width={penWidth}
          setColor={setPenColor}
          setWidth={setPenWidth}
        />
      )}

      {isHighlighter && (
        <CanvasHighlighter
          color={highlighterColor}
          width={highlighterWidth}
          setColor={setHighlighterColor}
          setWidth={setHighlighterWidth}
        />
      )}

      {isEraser && <CanvasEraser canvasProps={canvasProps} setCanvasProps={setCanvasProps} />}
    </CanvasBarWrapper>
  );
}
