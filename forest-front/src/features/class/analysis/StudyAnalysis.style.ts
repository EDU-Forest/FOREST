import { FullScreen } from "@/styles/container";
import { flexBox, scrollBar } from "@/styles/theme";
import styled, { css } from "styled-components";
import { ClassSummaryText } from "../ClassSummary.style";

const AnalysisFullScreen = styled(FullScreen)`
  ${flexBox("column", "start", "start")}
`;

const AnalysisTitle = styled.div`
  ${flexBox("row", "center", "left")}
  width: 100%;
  height: 5rem;
  background-color: white;
  font-weight: 700;
  font-size: 1.375rem;
  line-height: 1.625rem;
  padding: 1.5rem;
`;

const AnalysisContent = styled.div`
  padding: 2rem;
  width: 100%;
  height: calc(100% - 5rem);
  overflow-y: auto;
  ${scrollBar(0.75)}
`;

const AnalysisUpper = styled.div`
  ${flexBox("row", "center", "space-between")}
  flex-wrap: wrap;
  margin: 1.5rem 0;
  position: relative;
  gap: 1.5rem;
`;

const AnalysisUpperItem = styled.div`
  background-color: white;
  width: calc(50% - 0.75rem);
  /* aspect-ratio: 1; */
  box-shadow: 0rem 0rem 1.25rem 0.125rem rgba(0, 0, 0, 0.1);
  border-radius: 1.5rem;
  padding: 1.5rem;

  @media ${({ theme }) => theme.desktop} {
    width: calc(25% - 1.5rem);
  }
`;

const AnalysisSubTitle = styled.p<{ noMargin?: boolean }>`
  display: inline-block;
  font-weight: 700;
  margin-bottom: ${({ noMargin }) => (noMargin ? "0" : "0.5rem")};
`;

const AnalysisText = styled(ClassSummaryText)<{
  isGray?: boolean;
  isGreen?: boolean;
  noMargin?: boolean;
}>`
  font-weight: 400;
  ${({ noMargin }) =>
    noMargin &&
    css`
      margin-top: 0;
      margin-bottom: 0;
    `}
`;

const LabelCircle = styled.div<{ isCorrect?: boolean; notYet?: boolean; page: string }>`
  display: inline-block;
  width: 0.875rem;
  height: 0.875rem;
  vertical-align: baseline;
  border-radius: 100%;
  background-color: ${({ isCorrect, notYet, theme }) =>
    isCorrect
      ? theme.colors.Lime[700]
      : notYet
      ? theme.colors.Gray[300]
      : theme.colors.Orange[400]};
  margin-left: ${({ page }) => (page === "studyResult" ? "0.5rem" : "1rem")};
  margin-right: 0.25rem;
`;

export {
  AnalysisFullScreen,
  AnalysisTitle,
  AnalysisContent,
  AnalysisUpper,
  AnalysisUpperItem,
  AnalysisSubTitle,
  AnalysisText,
  LabelCircle,
};
