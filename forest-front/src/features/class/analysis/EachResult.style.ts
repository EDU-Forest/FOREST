import styled, { css } from "styled-components";
import { CorrectRateWrapper } from "./QuestionCorrectRate.style";
import { flexBox, scrollBar } from "@/styles/theme";

const EachResultWrapper = styled(CorrectRateWrapper)<{ height?: number }>`
  margin-top: 1.5rem;
  background-color: white;
  height: ${({ height }) => (height ? `${height}rem` : "39.5rem")};
`;

const ResultTableList = styled.div<{ isLabel?: boolean }>`
  ${flexBox("row", "center", "space-between")}
  width: 100%;
  padding: 1rem 0;
  border-top: 0.0625rem solid ${({ theme }) => theme.colors.Gray[400]};

  ${({ isLabel }) =>
    isLabel &&
    css`
      border-top: none;
      padding-right: 0.5rem;
    `}
`;

const ResultTableContent = styled.div`
  height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border: 1px solid transparent;
    border-radius: 3rem;
    background-color: #ced4da;
  }

  ::-webkit-scrollbar-track {
    border-radius: 3rem;
    /* background-color: #f1f3f5; */
    background-color: #ffffff;
  }
`;

const ResultTableItemBig = styled.div<{ isLabel?: boolean }>`
  ${({ isLabel }) =>
    isLabel &&
    css`
      font-weight: 600;
      color: ${({ theme }) => theme.colors.Gray[500]};
    `}
  width: 22%;
  text-align: center;
`;
const ResultTableItemSmall = styled(ResultTableItemBig)<{
  isIdx?: boolean;
  isOrange?: boolean;
  incorrect?: boolean;
}>`
  width: ${({ isIdx }) => (isIdx ? "5%" : "10%")};

  .icon {
    font-size: 1.5rem;
    cursor: pointer;
  }

  span {
    color: ${({ theme, isOrange }) =>
      isOrange ? theme.colors.Orange[700] : theme.colors.Lime[700]};
    margin-right: ${({ isOrange }) => !isOrange && "0.25rem"};
    font-weight: 700;
  }

  ${({ incorrect }) =>
    incorrect &&
    css`
      span {
        color: ${({ theme }) => theme.colors.Orange[700]};
        margin-right: 0.25rem;
      }
    `}

  @media ${({ theme }) => theme.tablet} {
    width: ${({ isIdx }) => (isIdx ? "8%" : "12%")};
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
  font-size: 0.875rem;
`;
export {
  EachResultWrapper,
  ResultTableContent,
  ResultTableList,
  ResultTableItemBig,
  ResultTableItemSmall,
  ResultTableName,
  ResultTableEmail,
};
