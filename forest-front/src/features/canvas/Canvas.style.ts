import { flexBox } from "@/styles/theme";
import styled, { css } from "styled-components";

const CanvasBarWrapper = styled.div<{ isOpenController?: boolean; nowTab?: string }>`
  ${flexBox("row", "center", "space-around")}
  position: relative;
  width: 440px;
  padding: 0 16px;
  height: 50px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  background-color: white;

  svg {
    font-size: 24px;
  }

  ${({ isOpenController }) =>
    isOpenController &&
    css`
      background-color: ${({ theme }) => theme.colors.Gray[50]};
      color: ${({ theme }) => theme.colors.Gray[600]};
    `}

  ${({ nowTab }) =>
    nowTab === "pen"
      ? css`
          .pen {
            color: black;
          }
        `
      : nowTab === "highlighter"
      ? css`
          .highlighter {
            color: black;
          }
        `
      : nowTab === "eraser" &&
        css`
          .eraser {
            color: black;
          }
        `}

  margin-top: 100px;
`;

const CanvasSelectorWrapper = styled.div<{ isEraser?: boolean }>`
  ${flexBox("row", "center", "space-between")}
  position: absolute;
  padding: 0 24px;
  top: 60px;
  width: ${({ isEraser }) => (isEraser ? "320px" : "380px")};
  height: 48px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: white;
  color: black;
`;

const CanvasSelectorSection = styled.div<{ width?: number }>`
  ${flexBox("row", "center", "space-evenly")}
  width: ${({ width }) => width && `${width}rem`};
`;

const CanvasColorSelector = styled.div<{ color: string }>`
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 100%;
  margin: 4px;
  background-color: ${({ color }) => color};
`;

const CanvasColorSelectorSelected = styled.div<{ selected?: boolean }>`
  ${flexBox("row", "center", "center")}
  border-radius: 8px;
  width: 40px;
  height: 40px;

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${({ theme }) => theme.colors.Gray[100]};
    `};
`;

const CanvasWidthSelectorWrapper = styled.div`
  ${flexBox("row", "center", "center")}
  text-align: center;
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 0.2px solid black;
  border-radius: 100%;
`;

const CanvasWidthSelector = styled.div<{ width?: number }>`
  display: inline-block;
  border-radius: 100%;
  vertical-align: middle;
  background-color: black;
  ${({ width }) =>
    width === 1
      ? css`
          width: 9px;
          height: 9px;
        `
      : width === 2
      ? css`
          width: 12px;
          height: 12px;
        `
      : width === 3 &&
        css`
          width: 15px;
          height: 15px;
        `}
`;

const CanvasDrawSection = styled.div<{ nowTab?: string }>`
  ${({ nowTab }) =>
    nowTab === "pen"
      ? css`
          cursor: url(images/pen.png) -40 48, auto;
        `
      : nowTab === "highlighter"
      ? css`
          cursor: url(images/highlighter.png) -40 48, auto;
        `
      : nowTab === "eraser" &&
        css`
          cursor: url(images/eraser.png) -20 20, auto;
        `}
`;

export {
  CanvasBarWrapper,
  CanvasSelectorWrapper,
  CanvasSelectorSection,
  CanvasColorSelector,
  CanvasColorSelectorSelected,
  CanvasWidthSelectorWrapper,
  CanvasWidthSelector,
  CanvasDrawSection,
};
