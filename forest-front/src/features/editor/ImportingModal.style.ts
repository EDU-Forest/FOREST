import { flexBox, positionCenter, scrollBar } from "@/styles/theme";
import styled from "styled-components";

const ImportingModalWrapper = styled.div`
  ${positionCenter("fixed")};
  width: calc(100% - 8rem);
  height: calc(100% - 6rem);
  padding: 3rem;
  background-color: white;
  box-shadow: 0rem 0.25rem 1.25rem rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  z-index: 30;

  @media ${({ theme }) => theme.desktop} {
    width: 70%;
    height: calc(100% - 8rem);
  }
`;

const ImportingModalInsideLine = styled.div`
  ${flexBox("row", "center", "center")};
  width: 100%;
  height: 100%;
  border: 2px dashed #82c91e;
  border-radius: 0.5rem;
`;

const PdfViewerWrapper = styled.div`
  width: 100%;
  height: calc(100% - 2rem);
  overflow-y: auto;
  overflow-x: hidden;
  ${scrollBar(0.5)}

  .react-pdf__Page__canvas {
    margin: 0 auto;
    width: 100% !important;
    height: 100% !important;
  }
`;
const PdfViewerXmark = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  svg {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.Gray[500]};
    cursor: pointer;
  }
`;

const PdfViewerPageController = styled.div`
  ${flexBox("row", "center", "center")}
  ${positionCenter("absolute")}
  z-index: 40;
  top: 1.5rem;
  right: 3rem;
  color: ${({ theme }) => theme.colors.Lime[800]};

  button {
    border: none;
    background-color: white;
    margin: 0 16px;

    &:disabled {
      svg {
        color: ${({ theme }) => theme.colors.Gray[300]};
      }
      cursor: default;
    }

    svg {
      vertical-align: text-bottom;
      font-size: 24px;
      color: ${({ theme }) => theme.colors.Lime[600]};
    }
  }
`;

const ImgCropperWrapper = styled.div`
  position: absolute;
  top: 3rem;
  width: calc(100% - 6rem);
  height: calc(100% - 8rem);
  background-color: white;

  overflow-y: auto;
  overflow-x: hidden;
  ${scrollBar(0.5)};

  div {
    .cropper-container {
      width: 100%;
      height: 100%;
    }
  }
`;

const PdfViewerBtnWrapper = styled.div`
  ${flexBox("row", "center", "center")};
  gap: 24px;
  width: 100%;
  margin-top: 24px;
`;

const ImgViewerBtnWrapper = styled(PdfViewerBtnWrapper)`
  position: absolute;
  left: 50%;
  bottom: 2rem;
  transform: translate(-50%);
`;

export {
  ImportingModalWrapper,
  ImportingModalInsideLine,
  PdfViewerWrapper,
  PdfViewerXmark,
  PdfViewerPageController,
  ImgCropperWrapper,
  PdfViewerBtnWrapper,
  ImgViewerBtnWrapper,
};
