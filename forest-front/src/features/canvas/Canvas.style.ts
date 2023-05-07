import { flexBox } from "@/styles/theme";
import styled, { css, keyframes } from "styled-components";

const openSlide = keyframes`
0% {
  width: 56px;
}

100% {
  width: 440px;
}
`;

const closeSlide = keyframes`
0% {
  width: 440px;
}

100% {
  width: 56px;
}
`;

const moveToLeft = keyframes`
0% {
  left: 16px;
}

100% {
  left: 7px;
}
`;

const moveToRight = keyframes`
0% {
  left: 7px;
}

100% {
  left: 16px;
}
`;

const show = keyframes`
0% {
  opacity: 0
}

100% {
  opacity: 1
}
`;

const canvasBlur = keyframes`
0% {
  backdrop-filter: blur(2px);
}

100% {
  backdrop-filter: blur(0px)
}
`;

const CanvasBarWrapper = styled.div<{
  isOpenCanvas?: boolean;
  isOpenController?: boolean;
  nowTab?: string;
}>`
  ${flexBox("row", "center", "space-around")}
  position: relative;
  width: 50px;
  padding: 0 16px;
  height: 50px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  background-color: white;

  animation: ${closeSlide} 0.4s 1;

  .img-div {
    position: absolute;
    left: 7px;
    animation: ${moveToLeft} 0.5s 1;

    .logo {
      width: 36px;
    }

    &:hover {
      .info {
        display: block;
      }
    }
  }

  .info {
    display: none;

    position: absolute;
    top: 44px;
    left: -20px;
    width: 120px;
    height: 24px;
    font-size: 13px;
    background-color: ${({ theme }) => theme.colors.Lime[50]};
    border-radius: 12px;
    text-align: center;
    line-height: 24px;
  }

  svg {
    font-size: 24px;
  }

  ${({ isOpenCanvas }) =>
    isOpenCanvas &&
    css`
      animation: ${openSlide} 0.5s 1;
      width: 440px;

      .img-div {
        animation: ${moveToRight} 0.5s 1;
        left: 16px;

        &:hover {
          .info {
            display: none;
          }
        }
      }

      svg {
        animation: ${show} 0.5s 1;
      }
    `}

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
`;

const CanvasBarItems = styled.div<{ isOpenCanvas?: boolean }>`
  ${flexBox("row", "center", "space-around")}
  margin-left: 40px;
  width: 340px;
  ${({ isOpenCanvas }) =>
    !isOpenCanvas &&
    css`
      width: 0px;
    `}
`;

const CanvasSelectorWrapper = styled.div`
  ${flexBox("row", "center", "space-between")}
  position: absolute;
  padding: 0 24px;
  gap: 12px;
  top: 60px;
  width: 380px;
  height: 48px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: white;
  color: black;
  z-index: 10;
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
  animation: ${canvasBlur} 1s 1;
  height: calc(100% - 4rem);
  position: absolute;
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
  CanvasBarItems,
  CanvasSelectorWrapper,
  CanvasSelectorSection,
  CanvasColorSelector,
  CanvasColorSelectorSelected,
  CanvasWidthSelectorWrapper,
  CanvasWidthSelector,
  CanvasDrawSection,
};
