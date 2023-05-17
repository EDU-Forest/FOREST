import { Title } from "@/styles/text";
import styled from "styled-components";
import { StyledTestCommonBtn } from "../common/TextCommon.style";
import { scrollBar } from "@/styles/theme";

const TestResultTotalBox = styled.div`
  width: 720px;
  height: 360px;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.Lime[50]};
  box-shadow: 0rem 0rem 1.25rem 0.125rem rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  margin-top: 2rem;
  margin-bottom: 24px;
`;

const TestResultTotalTitleBox = styled(Title)`
  margin-bottom: 22px;
`;

const TestResultTotalContentBox = styled.div`
  width: 672px;
  height: 264px;
  padding: 28px;
  background-color: white;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .icon {
    width: 60px;
    height: 1.75rem;
  }
`;

const TestResultTotalContentDetailBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TestResultTotalContentDetailItemBox = styled.div`
  width: 304px;
  height: 64px;
  border-radius: 8px;
  border: 0.0625rem solid ${({ theme }) => theme.colors.Lime[300]};
  padding: 18px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    margin-right: 16px;
    width: 1.75rem;
    height: 1.75rem;
  }
`;

const TestResultTotalContentGraphBox = styled.div`
  width: 9.5rem;
  height: 9.5rem;
  border-radius: 50%;
`;

const TestResultTotalContentDetailLeftItemBox = styled.div`
  display: flex;
`;
const TestResultTotalContentDetailRightItemBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  > p:first-child {
    font-weight: 700;
    margin-right: 0.25rem;
    font-size: 1rem;
  }
`;

const TestResultLabelText = styled.div`
  font-size: 1rem;
  font-weight: 600;
  line-height: 28px;
`;

const TestResultQuestionBox = styled.div`
  width: 45rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.1);
`;

const TestResultTitleBox = styled.div`
  font-size: 22px;
  font-weight: 700;
`;

const ResultContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const TestResultOkBtn = styled(StyledTestCommonBtn)`
  height: 64px;
  font-size: 1rem;
  margin-bottom: 2rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.Lime[900]};
  }
`;

const TestResultContentBox = styled.div`
  margin: 3.75rem 6rem;
  width: 30rem;
  min-height: 6rem;
  position: relative;
`;

const TestResultQuestionBtn = styled.button<{ isCorrect: boolean; userRole?: string }>`
  border: none;
  margin: 1rem;
  width: 4rem;
  height: 4rem;
  color: white;
  cursor: ${({ userRole }) => (userRole === "teacher" ? "default" : "cursor")};
  background-color: ${({ isCorrect, theme }) =>
    isCorrect ? theme.colors.Lime[700] : theme.colors.Orange[700]};
  font-size: 1.375rem;
  font-weight: 700;
  border-radius: 0.5rem;

  &:hover {
    background-color: ${({ userRole, isCorrect, theme }) =>
      userRole !== "teacher"
        ? isCorrect
          ? theme.colors.Lime[900]
          : theme.colors.Orange[900]
        : ""};
  }
`;

const TestBtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0rem 3rem;

  svg {
    cursor: pointer;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    padding: 0.25rem;
    margin: 1rem 2rem 0rem 2rem;
  }
  .ok {
    background-color: ${({ theme }) => theme.colors.Lime[200]};
    color: ${({ theme }) => theme.colors.Lime[700]};
    border: 0.0625rem solid ${({ theme }) => theme.colors.Lime[700]};

    &:hover {
      background-color: ${({ theme }) => theme.colors.Lime[300]};
      color: ${({ theme }) => theme.colors.Lime[900]};
      border: 0.0625rem solid ${({ theme }) => theme.colors.Lime[900]};
    }
  }

  .cancel {
    background-color: ${({ theme }) => theme.colors.Orange[200]};
    color: ${({ theme }) => theme.colors.Orange[700]};
    border: 0.0625rem solid ${({ theme }) => theme.colors.Orange[700]};

    &:hover {
      background-color: ${({ theme }) => theme.colors.Orange[300]};
      color: ${({ theme }) => theme.colors.Orange[900]};
      border: 0.0625rem solid ${({ theme }) => theme.colors.Orange[900]};
    }
  }
`;

const TestResultNotOpenBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TestResultSectionBox = styled.div`
  width: 100%;
  height: calc(100% - 5rem);
  overflow: auto;
  ${scrollBar(0.75)}
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export {
  TestResultTotalBox,
  TestResultTotalTitleBox,
  TestResultTotalContentBox,
  TestResultTotalContentDetailBox,
  TestResultTotalContentDetailItemBox,
  TestResultTotalContentDetailLeftItemBox,
  TestResultTotalContentDetailRightItemBox,
  TestResultTotalContentGraphBox,
  TestResultLabelText,
  TestResultQuestionBox,
  TestResultQuestionBtn,
  TestResultTitleBox,
  ResultContainer,
  TestResultOkBtn,
  TestResultContentBox,
  TestBtnBox,
  TestResultNotOpenBox,
  TestResultSectionBox,
};
