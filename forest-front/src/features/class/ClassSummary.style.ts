import { Title } from "@/styles/text";
import { flexBox } from "@/styles/theme";
import styled, { css } from "styled-components";

const ClassSummaryTitle = styled(Title)`
  display: inline-block;
  margin: 0;
  line-height: 2rem;
  margin-right: 2rem;
`;

const ClassSummaryWrapper = styled.div`
  width: 100%;
  height: 23.875rem;
  box-shadow: 0rem 0rem 1.25rem 0.125rem rgba(0, 0, 0, 0.1);
  border-radius: 1.5rem;
  margin-top: 1.5rem;
  padding: 2rem;
  margin-bottom: 2.25rem;

  @media ${({ theme }) => theme.tablet} {
    height: 41rem;
  }
`;

const ClassSummaryItemWrapper = styled.div`
  ${flexBox("row", "center", "space-between")}

  @media ${({ theme }) => theme.tablet} {
    ${flexBox("column", "center", "center")}
    width: 50%;
    height: calc(100% - 4.0625rem);
    flex-wrap: wrap;
  }
`;

const ClassSummaryTextWrapper = styled.div`
  ${flexBox("row", "center", "space-between")}
`;

const ClassSummaryTextItem = styled.div`
  ${flexBox("row", "center", "center")}
`;

const ClassSummaryDeadline = styled.p`
  color: ${({ theme }) => theme.colors.Gray[500]};
  margin: 0;
  margin-top: 0.25rem;
`;

const ClassSummarySubTitle = styled.p<{ noMargin?: boolean }>`
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 0.5rem;

  ${({ noMargin }) =>
    noMargin &&
    css`
      margin-top: 0rem;
      margin-bottom: 2rem;
    `}
`;

const SummaryItemWrapper = styled.div`
  ${flexBox("column", "start", "center")}
  width: 96%;
  margin: 0 2%;
  /* height: 14rem; */
`;

const SummaryChartWrapper = styled(SummaryItemWrapper)<{ isStudent?: boolean }>`
  ${flexBox("column", "center", "center")}

  @media ${({ theme }) => theme.tablet} {
    ${({ isStudent }) =>
      isStudent &&
      css`
        margin-top: 2rem;
        margin-bottom: 2rem;
      `}
  }
`;

const WorkbookInfo = styled.div`
  border: 0.0625rem solid ${({ theme }) => theme.colors.Lime[300]};
  border-radius: 0.5rem;
  width: 100%;
  height: 12.75rem;
  padding: 0.5rem 1.5rem;
`;

const SummaryResultWrapper = styled.div`
  ${flexBox("column", "center", "space-between")};
  width: 100%;
  height: 12.75rem;
`;

const ResultInfoItem = styled.div`
  ${flexBox("row", "center", "space-between")};
  border: 0.0625rem solid ${({ theme }) => theme.colors.Lime[300]};
  border-radius: 0.5rem;
  width: 100%;
  height: 3.75rem;
  padding: 1rem;

  .wrapper {
    ${flexBox("row", "center", "start")}
  }
`;

const ClassSummaryText = styled.p<{ isGray?: boolean; isGreen?: boolean }>`
  display: inline-block;
  font-weight: 600;
  color: ${({ isGray, isGreen, theme }) =>
    isGray ? theme.colors.Gray[500] : isGreen ? theme.colors.Lime[600] : "Black"};
  text-align: left;
  margin: 0.875rem 0;
  margin-right: 0.25rem;

  .icon {
    font-size: 1.125rem;
    vertical-align: text-top;
    margin-left: 0.25rem;
  }
`;

const ClassSummaryIcon = styled.div`
  ${flexBox("column", "center", "center")}
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.Lime[50]};
  margin-right: 0.5rem;

  .icon {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.Lime[600]};
  }
`;

export {
  ClassSummaryTitle,
  ClassSummaryWrapper,
  ClassSummaryItemWrapper,
  ClassSummaryTextItem,
  ClassSummaryDeadline,
  SummaryResultWrapper,
  SummaryItemWrapper,
  SummaryChartWrapper,
  ClassSummarySubTitle,
  WorkbookInfo,
  ResultInfoItem,
  ClassSummaryTextWrapper,
  ClassSummaryText,
  ClassSummaryIcon,
};
