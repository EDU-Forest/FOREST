import {
  CanvasColorSelector,
  CanvasColorSelectorSelected,
  CanvasSelectorArrow,
  CanvasSelectorSection,
  CanvasSelectorWrapper,
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

  return (
    <CanvasSelectorWrapper>
      <CanvasSelectorArrow />
      <CanvasSelectorSection width={8}>
        <CanvasColorSelectorSelected
          selected={3 === width ? true : false}
          onClick={() => setWidth(3)}
        >
          <img src="/images/thin.png" style={{ width: "1.75rem" }} />
        </CanvasColorSelectorSelected>
        <CanvasColorSelectorSelected
          selected={6 === width ? true : false}
          onClick={() => setWidth(6)}
        >
          <img src="/images/regular.png" style={{ width: "1.75rem" }} />
        </CanvasColorSelectorSelected>
        <CanvasColorSelectorSelected
          selected={9 === width ? true : false}
          onClick={() => setWidth(9)}
        >
          <img src="/images/bold.png" style={{ width: "1.75rem" }} />
        </CanvasColorSelectorSelected>
      </CanvasSelectorSection>
      <CanvasSelectorSection width={15}>
        {penColors.map((item, idx) => (
          <CanvasColorSelectorSelected
            key={`canvas-color-selected-2-${idx}`}
            selected={item.colorCode === color ? true : false}
          >
            <CanvasColorSelector color={item.colorCode} onClick={() => setColor(item.colorCode)} />
          </CanvasColorSelectorSelected>
        ))}
      </CanvasSelectorSection>
    </CanvasSelectorWrapper>
  );
}
