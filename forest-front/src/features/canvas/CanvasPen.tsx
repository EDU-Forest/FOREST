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
        {penWidth.map((item, idx) => (
          <CanvasColorSelectorSelected key={idx} selected={item === width ? true : false}>
            <CanvasWidthSelectorWrapper>
              <CanvasWidthSelector onClick={() => setWidth(item)} width={widthToCss(item)} />
            </CanvasWidthSelectorWrapper>
          </CanvasColorSelectorSelected>
        ))}
      </CanvasSelectorSection>
      <CanvasSelectorSection width={15}>
        {penColors.map((item, idx) => (
          <CanvasColorSelectorSelected selected={item.colorCode === color ? true : false}>
            <CanvasColorSelector
              key={idx}
              color={item.colorCode}
              onClick={() => setColor(item.colorCode)}
            />
          </CanvasColorSelectorSelected>
        ))}
      </CanvasSelectorSection>
    </CanvasSelectorWrapper>
  );
}
