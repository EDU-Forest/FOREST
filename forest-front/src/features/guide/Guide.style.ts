import { Container } from "@/styles/container";
import { flexBox } from "@/styles/theme";
import styled, { css } from "styled-components";

const GuideIconWrapper = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.Gray[500]};
  svg {
    font-size: 1.25rem;
  }
  &:hover {
    .hover-text {
      display: block;
    }
    svg {
      color: ${({ theme }) => theme.colors.Orange[700]};
    }
  }

  .hover-text {
    display: none;
    clip-path: polygon(0 11%, 100% 10%, 100% 75%, 61% 75%, 50% 100%, 39% 76%, 0% 75%);
    position: absolute;
    right: -30px;
    top: -40px;
    width: 80px;
    height: 40px;
    font-size: 13px;
    font-weight: 600;
    color: black;
    line-height: 24px;
    background-color: ${({ theme }) => theme.colors.Lime[300]};
    text-align: center;
    padding-top: 6px;
  }

  @media ${({ theme }) => theme.tablet} {
    .hover-text {
      right: -20px;
    }
  }
`;

const GuideContentWrapper = styled(Container)`
  padding: 32px;

  @media ${({ theme }) => theme.tablet} {
    width: calc(100% - 10rem);
  }
`;

const GuideContentBox = styled.div`
  position: relative;
  background-color: white;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  width: 100%;
  min-height: calc(100% - 50px);
  padding: 32px;
`;

const LogoImg = styled.div`
  position: relative;
  width: 30%;
  aspect-ratio: 1.2;
  margin: auto;

  @media ${({ theme }) => theme.tablet} {
    width: 50%;
  }
`;

const GuideSectionContentWrapper = styled.div<{ noMarginTop?: boolean }>`
  width: 90%;
  margin: auto;
  margin-top: ${({ noMarginTop }) => (noMarginTop ? "0" : "32px")};
  margin-bottom: 40px;

  @media ${({ theme }) => theme.tablet} {
    width: 100%;
  }

  .halt-img-div {
    width: 50%;
    text-align: center;

    img {
      width: 90%;
    }
  }

  .half-text-div {
    width: 50%;
    padding: 0 2.5%;
  }

  .marginBtm-div {
    margin-bottom: 80px;
  }

  .class-summary1 {
    width: 100%;
    margin: auto;
  }
  .class-summary-img-div {
    margin: auto;
    margin-top: 32px;
    width: 90%;
    ${flexBox("row", "center", "center")};
    gap: 40px;
    flex-wrap: wrap;
  }
  .class-summary-half {
    width: calc(50% - 20px);
  }

  @media ${({ theme }) => theme.tablet} {
    .class-summary-half {
      width: 80%;
    }
  }
`;

const GuideSearchContentWrapper = styled(GuideSectionContentWrapper)`
  ${flexBox("row", "top", "center")}
  gap:48px;

  .search-sub-div {
    margin-top: 48px;
  }

  img {
    width: 55%;
  }

  @media ${({ theme }) => theme.tablet} {
    flex-wrap: wrap;
    .search-sub-div {
      margin-top: 32px;
    }

    img {
      width: 90%;
    }
  }
`;

const GuideSubContentWrapper = styled.div<{ mb?: boolean }>`
  margin-top: 32px;
  margin-bottom: ${({ mb }) => mb && "48px"};
`;

const GuideHorizonContentWrapper = styled.div<{ wrapReverse?: boolean }>`
  ${flexBox("row", "top", "space-around")}
  width: 100%;
  margin-bottom: 48px;

  .class-text-div {
    width: calc(60% - 40px);
    ${flexBox("column", "start", "center")}
    gap: 48px;
    margin-right: 40px;
  }

  .class-text-result {
    width: calc(35% - 40px);
    margin-right: 40px;
  }

  .class-make-img {
    width: 100%;
  }

  .class-result-img {
    width: 65%;
  }

  @media ${({ theme }) => theme.tablet} {
    .class-make-img {
      width: 60%;
    }
    .class-result-img {
      width: 80%;
    }

    .class-text-result {
      width: 100%;
    }

    .class-result-img {
      width: 100%;
      margin-bottom: 32px;
    }
  }

  .problem-text-div {
    width: calc(60% - 40px);
    ${flexBox("column", "start", "space-between")}
    max-height: 500px;
    margin-right: 40px;
  }

  .problem-img-div {
    ${flexBox("column", "end", "center")}
    gap: 36px;
    width: 40%;

    .problem-sub1 {
      width: 80%;
    }

    .problem-sub2 {
      width: 100%;
    }
  }

  .editor-text-div {
    width: calc(60% - 48px);
    ${flexBox("column", "top", "center")}
    gap: 48px;
    margin-right: ${({ wrapReverse }) => wrapReverse && "48px"};
    margin-left: ${({ wrapReverse }) => !wrapReverse && "48px"};
  }

  .editor_make {
    width: 40%;
  }

  @media ${({ theme }) => theme.tablet} {
    ${({ wrapReverse }) =>
      wrapReverse
        ? css`
            ${flexBox("column-reverse", "top", "space-around")}
          `
        : css`
            ${flexBox("column", "top", "space-around")}
          `}

    flex-wrap: wrap;

    .problem-text-div {
      width: 100%;
      ${flexBox("column", "start", "space-between")}
      gap: 32px;
      margin-right: 0;
    }

    .problem-img-div {
      ${flexBox("row", "bottom", "center")}
      gap: 36px;
      width: 100%;
      margin-bottom: 32px;

      .problem-sub1 {
        width: calc(50% - 36px);
      }

      .problem-sub2 {
        width: 50%;
      }
    }

    .editor-text-div {
      width: 80%;
      margin: auto;
    }
    .editor_make {
      width: 80%;
      margin: auto;
      margin-bottom: 32px;
    }
  }
`;

const GuideHorizonNoWrap = styled.div`
  ${flexBox("row", "top", "space-around")}
  width: 100%;
  margin-bottom: 48px;
  margin-top: 80px;

  .role-img {
    width: 30%;
    aspect-ratio: 0.85 / 1;
    min-width: 160px;
    max-width: 240px;
    object-fit: contain;
  }

  .role-text-div {
    width: 50%;
  }

  .role-text-sub {
    ${flexBox("row", "center", "start")}
    gap: 8px;
    margin: 24px 0;
  }

  .editor-new {
    width: 20%;
    margin-right: 48px;
  }

  .editor-object {
    width: calc(60% - 48px);
    ${flexBox("column", "top", "center")}
    text-align: right;
    margin-right: 48px;
    height: 100%;
  }

  @media ${({ theme }) => theme.tablet} {
    .role-text-sub {
      margin: 12px 0;
    }
  }
`;

const GuideCheckIcon = styled.div`
  width: 24px;
  height: 24px;
  display: inline-block;

  svg {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.Lime[800]};
  }

  @media ${({ theme }) => theme.tablet} {
    svg {
      font-size: 20px;
    }
  }
`;

export {
  GuideIconWrapper,
  GuideContentWrapper,
  GuideContentBox,
  LogoImg,
  GuideSectionContentWrapper,
  GuideSearchContentWrapper,
  GuideSubContentWrapper,
  GuideHorizonContentWrapper,
  GuideHorizonNoWrap,
  GuideCheckIcon,
};
