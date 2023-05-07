import {
  CanvasColorSelector,
  CanvasColorSelectorSelected,
  CanvasSelectorSection,
  CanvasSelectorWrapper,
  CanvasWidthSelector,
  CanvasWidthSelectorWrapper,
} from "./Canvas.style";

interface Iprops {
  color: string;
  width: number;
  setColor: (color: string) => void;
  setWidth: (width: number) => void;
}

interface Colors {
  color: string;
  colorCode: string;
}

export default function CanvasPen({ color, width, setColor, setWidth }: Iprops) {
  const penColors: Colors[] = [
    { color: "black", colorCode: "#000000" },
    { color: "red", colorCode: "#FF2626" },
    { color: "blue", colorCode: "#4123e8" },
    { color: "green", colorCode: "#fde440" },
    { color: "yellow", colorCode: "#1BAB19" },
  ];

  const penWidth = [3, 6, 9];
  const widthToCss = (width: number) => {
    if (width === 3) return 1;
    else if (width === 6) return 2;
    else if (width === 9) return 3;
    else return 1;
  };

  return (
    <CanvasSelectorWrapper>
      <CanvasSelectorSection width={8}>
        {/* {penWidth.map((item, idx) => (
          <CanvasColorSelectorSelected key={idx} selected={item === width ? true : false}>
            <CanvasWidthSelectorWrapper>
              <CanvasWidthSelector onClick={() => setWidth(item)} width={widthToCss(item)} />
            </CanvasWidthSelectorWrapper>
          </CanvasColorSelectorSelected>
        ))} */}
        <CanvasColorSelectorSelected
          selected={3 === width ? true : false}
          onClick={() => setWidth(3)}
        >
          <img src="/images/thin.png" style={{ width: "28px" }} />
        </CanvasColorSelectorSelected>
        <CanvasColorSelectorSelected
          selected={6 === width ? true : false}
          onClick={() => setWidth(6)}
        >
          <img src="/images/regular.png" style={{ width: "28px" }} />
        </CanvasColorSelectorSelected>
        <CanvasColorSelectorSelected
          selected={9 === width ? true : false}
          onClick={() => setWidth(9)}
        >
          <img src="/images/bold.png" style={{ width: "28px" }} />
        </CanvasColorSelectorSelected>
      </CanvasSelectorSection>
      <CanvasSelectorSection width={15}>
        {penColors.map((item, idx) => (
          <CanvasColorSelectorSelected key={idx} selected={item.colorCode === color ? true : false}>
            <CanvasColorSelector color={item.colorCode} onClick={() => setColor(item.colorCode)} />
          </CanvasColorSelectorSelected>
        ))}
      </CanvasSelectorSection>
    </CanvasSelectorWrapper>
  );
}
