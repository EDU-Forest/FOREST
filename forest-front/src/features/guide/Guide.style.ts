import { Container } from "@/styles/container";
import { flexBox } from "@/styles/theme";
import styled from "styled-components";

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
`;

const GuideSubContentWrapper = styled.div`
  margin-top: 32px;
`;

const GuideHorizonContentWrapper = styled.div`
  ${flexBox("row", "top", "space-around")}
  width: 100%;
  margin-bottom: 48px;

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

  @media ${({ theme }) => theme.tablet} {
    ${flexBox("column-reverse", "top", "space-around")}
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
  }
`;

export {
  GuideContentWrapper,
  GuideContentBox,
  LogoImg,
  GuideSectionContentWrapper,
  GuideSubContentWrapper,
  GuideHorizonContentWrapper,
};
