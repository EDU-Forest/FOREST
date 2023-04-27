import styled, { css } from "styled-components";
import { CorrectRateWrapper } from "./QuestionCorrectRate.style";
import { flexBox } from "@/styles/theme";

const EachResultWrapper = styled(CorrectRateWrapper)`
  margin-top: 1.5rem;
`;

const ResultTable = styled.div``;

const ResultTableList = styled.div<{ isLabel?: boolean }>`
  ${flexBox("row", "center", "space-between")}
  width: 100%;
  padding: 1rem 0;
  border-top: 0.0625rem solid
    ${({ isLabel, theme }) => (isLabel ? "white" : theme.colors.Gray[400])};
`;

const ResultTableItemBig = styled.div<{ isLabel?: boolean }>`
  ${({ isLabel }) =>
    isLabel &&
    css`
      font-weight: 600;
      color: ${({ theme }) => theme.colors.Gray[500]};
    `}
  width: 20%;
  text-align: center;
`;
const ResultTableItemSmall = styled(ResultTableItemBig)`
  width: 10%;

  .icon {
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

const ResultTableName = styled.div`
  ${flexBox("column", "center", "center")}
  font-weight: 600;
`;

const ResultTableEmail = styled.p`
  color: ${({ theme }) => theme.colors.Gray[500]};
  margin-top: 0.25rem;
  font-weight: 400;
`;
export {
  EachResultWrapper,
  ResultTable,
  ResultTableList,
  ResultTableItemBig,
  ResultTableItemSmall,
  ResultTableName,
  ResultTableEmail,
};
