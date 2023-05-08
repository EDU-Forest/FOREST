import { ReactSketchCanvasProps } from "react-sketch-canvas";
import {
  CanvasColorSelectorSelected,
  CanvasSelectorArrow,
  CanvasSelectorWrapper,
  CanvasWidthSelector,
} from "./Canvas.style";
import { BsFillEraserFill } from "react-icons/bs";

interface Iprops {
  canvasProps: Partial<ReactSketchCanvasProps>;
  setCanvasProps: React.Dispatch<React.SetStateAction<Partial<ReactSketchCanvasProps>>>;
}

export default function CanvasEraser({ canvasProps, setCanvasProps }: Iprops) {
  const changeEraser = (width: number) => {
    setCanvasProps((prevCanvasProps: Partial<ReactSketchCanvasProps>) => ({
      ...prevCanvasProps,
      eraserWidth: width,
    }));
  };

  const eraserWidth = [5, 10, 15, 20, 30];

  const widthToCss = (width: number) => {
    if (width === 5) return 16;
    else if (width === 10) return 20;
    else if (width === 15) return 24;
    else if (width === 20) return 28;
    else if (width === 30) return 32;
  };

  return (
    <CanvasSelectorWrapper style={{ width: "20rem" }}>
      <CanvasSelectorArrow style={{ left: "9rem" }} />
      {eraserWidth.map((item, idx) => (
        <CanvasColorSelectorSelected selected={item === canvasProps.eraserWidth ? true : false}>
          <BsFillEraserFill key={idx} onClick={() => changeEraser(item)} size={widthToCss(item)} />
        </CanvasColorSelectorSelected>
      ))}
    </CanvasSelectorWrapper>
  );
}
