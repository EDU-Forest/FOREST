import { Title } from "@/styles/text";
import { flexBox } from "@/styles/theme";
import styled from "styled-components";

const ClassSummaryTitle = styled(Title)`
  display: inline-block;
  margin-bottom: 12px;
`;

const ClassSummaryWrapper = styled.div`
  width: calc(100% - 64px);
  height: 318px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  margin-top: 24px;
  padding: 32px;
`;

const ClassSummaryDeadline = styled.p`
  color: ${({ theme }) => theme.colors.Gray[500]};
  margin: 0;
`;

const SummarySubWrapper = styled.div`
  ${flexBox("row", "center", "space-between")}
`;

const ClassSummarySubTitle = styled.p`
  font-weight: 700;
  margin-top: 32px;
  margin-bottom: 8px;
`;

const SummaryItemWrapper = styled.div`
  ${flexBox("column", "start", "center")}
  width: 100%;
  /* height: 224px; */
`;

const WorkbookInfo = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.Lime[300]};
  border-radius: 8px;
  width: calc(100% - 48px);
  height: 188px;
  padding: 8px 24px;
`;

const ResultInfoItem = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.Lime[300]};
  border-radius: 8px;
  width: 100%;
  height: 60px;
`;

const ClassSummaryTextWrapper = styled.div`
  ${flexBox("row", "center", "space-between")}
`;

const ClassSummaryText = styled.p<{ isGray?: boolean }>`
  display: inline-block;
  font-weight: 600;
  color: ${({ isGray, theme }) => (isGray ? theme.colors.Gray[500] : "Black")};
  text-align: left;
  margin: 14px 0;
`;

const ClassSummaryIcon = styled.div`
  ${flexBox("column", "center", "center")}
  width: 28px;
  height: 28px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.Lime[50]};

  .icon {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.Lime[600]};
  }
`;

export {
  ClassSummaryTitle,
  ClassSummaryWrapper,
  ClassSummaryDeadline,
  SummarySubWrapper,
  SummaryItemWrapper,
  ClassSummarySubTitle,
  WorkbookInfo,
  ResultInfoItem,
  ClassSummaryTextWrapper,
  ClassSummaryText,
  ClassSummaryIcon,
};
