import {
  CanvasColorSelector,
  CanvasColorSelectorSelected,
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
  viewCode: string;
}

export default function CanvasHighlighter({ color, width, setColor, setWidth }: Iprops) {
  const highlighterColors: Colors[] = [
    { color: "yellowH", colorCode: "rgba(250, 255, 0, 0.2)", viewCode: "rgba(250, 255, 0, 0.7)" },
    { color: "pinkH", colorCode: "rgba(255, 72, 72, 0.2)", viewCode: "rgba(255, 72, 72, 0.7)" },
    {
      color: "skyblueH",
      colorCode: "rgba(99, 180, 255, 0.2)",
      viewCode: "rgba(99, 180, 255, 0.7)",
    },
    { color: "greenH", colorCode: "rgba(36, 255, 0, 0.2)", viewCode: "rgba(36, 255, 0, 0.7)" },
    { color: "orangeH", colorCode: "rgba(255, 123, 0, 0.2)", viewCode: "rgba(255, 123, 0, 0.7)" },
    { color: "purpleH", colorCode: "rgba(214, 97, 255, 0.2)", viewCode: "rgba(214, 97, 255, 0.7)" },
  ];

  const highlighterWidth = [10, 15, 20];

  return (
    <CanvasSelectorWrapper style={{ width: "440px" }}>
      <CanvasSelectorSection width={8}>
        {/* {highlighterWidth.map((item, idx) => (
          <CanvasColorSelectorSelected selected={item === width ? true : false}>
            <p key={idx} onClick={() => setWidth(item)}>
              {item}
            </p>
          </CanvasColorSelectorSelected>
        ))} */}

        <CanvasColorSelectorSelected
          selected={10 === width ? true : false}
          onClick={() => setWidth(10)}
        >
          <img src="/images/thinH.png" style={{ width: "24px" }} />
        </CanvasColorSelectorSelected>
        <CanvasColorSelectorSelected
          selected={15 === width ? true : false}
          onClick={() => setWidth(15)}
        >
          <img src="/images/regularH.png" style={{ width: "26px" }} />
        </CanvasColorSelectorSelected>
        <CanvasColorSelectorSelected
          selected={20 === width ? true : false}
          onClick={() => setWidth(20)}
        >
          <img src="/images/boldH.png" style={{ width: "28px" }} />
        </CanvasColorSelectorSelected>
      </CanvasSelectorSection>
      <CanvasSelectorSection width={15}>
        {highlighterColors.map((item, idx) => (
          <CanvasColorSelectorSelected key={idx} selected={item.colorCode === color ? true : false}>
            <CanvasColorSelector color={item.viewCode} onClick={() => setColor(item.colorCode)} />
          </CanvasColorSelectorSelected>
        ))}
      </CanvasSelectorSection>
    </CanvasSelectorWrapper>
  );
}
