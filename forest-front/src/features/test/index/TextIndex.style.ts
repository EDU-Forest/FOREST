import { StyledCommonBtn } from "@/components/Button/Btn.style";
import { Title } from "@/styles/text";
import styled from "styled-components";

const StyledTestContainer = styled.div`
  width: 100vw;
`;

const StyledAnswerBox = styled.div`
  margin-left: 1.5rem;
  width: calc(100vw - 67.25rem);
  min-width: 10rem;
  max-width: 21.5rem;
`;

const StyledTestHeader = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 24px;
  position: fixed;
  top: 0;
`;

const StyledTestHeaderContentBox = styled.div`
  display: flex;

  .icon {
    width: 32px;
    height: 32px;
    color: ${({ theme }) => theme.colors.Lime[700]};

    &:hover {
      color: ${({ theme }) => theme.colors.Lime[900]};
    }
  }
`;

const StyledTestHeaderTitle = styled.div`
  margin-left: 32px;
  font-size: 22px;
  font-weight: 700;
`;

const StyledTestHeaderText = styled.div`
  margin-left: 1.5rem;
  font-size: 22px;
`;

// TestContent
const StyledTestContent = styled.div`
  margin: 8rem 3.75rem;
  display: flex;
  justify-content: center;
`;

const StyledTestProblemBox = styled.div`
  width: calc(100vw - 30.5rem);
  min-width: 33.5rem;
  padding: 2.5rem 2.5rem 1.125rem 2.5rem;
  background-color: white;
  box-shadow: 0rem 0rem 1.25rem 0.125rem rgba(0, 0, 0, 0.1);
  border-radius: 1.5rem;
  overflow: auto;
`;

const StyledTestProblemTitle = styled.div`
  display: flex;
`;

const StyledTestProblemTitleLabel = styled.div`
  width: 56px;
  height: 28px;
  color: white;
  font-weight: 700;
  line-height: 28px;
  border-radius: 4px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.Lime[700]};
`;

const StyledTestProblemTitleContent = styled.div`
  font-size: 22px;
  font-weight: 700;
  margin-left: 24px;
`;

const StyledTestProblemText = styled.div`
  border: 0.0625rem solid ${({ theme }) => theme.colors.Lime[600]};
  border-radius: 4px;
  padding: 24px;
  margin: 32px 0px;
  line-height: 150%;
`;

const StyledTestProblemMultipleChoiceAnswer = styled.div``;

const StyledTestProblemAnswerNumber = styled.div`
  display: flex;
  margin-bottom: 22px;
`;

const StyledTestNumberBtn = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 0.0625rem solid ${({ theme }) => theme.colors.Lime[600]};
  color: ${({ theme }) => theme.colors.Lime[600]};
  background-color: ${({ theme }) => theme.colors.Lime[50]};
  text-align: center;
  line-height: 24px;
  font-size: 0.875rem;
`;

const StyledTestNumberText = styled.div`
  margin-left: 24px;
  font-size: 16px;
`;

// TestAnswerBox

const StyledUsername = styled(Title)`
  margin-bottom: 12px;
`;

const StyledTestAnswerTable = styled.table`
  /* border: 1px solid ${({ theme }) => theme.colors.Lime[800]}; */
  border-radius: 0.5rem;
  border-style: hidden;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.Lime[800]};
  border-collapse: collapse;
  text-align: center;
  width: 100%;

  tbody:last-child {
    & :first-child {
      border-radius: 0 0 0 0.5rem;
    }
    & :last-child {
      border-radius: 0 0 0.5rem 0;
    }
  }

  th {
    height: 4rem;
    background-color: ${({ theme }) => theme.colors.Lime[200]};
    color: ${({ theme }) => theme.colors.Lime[900]};
    font-weight: 700;
    border-radius: 0.5rem 0.5rem 0rem 0rem;
  }

  th,
  td {
    border-bottom: 1px solid ${({ theme }) => theme.colors.Lime[700]};
  }

  tr {
    td {
      padding: 0.75rem;
    }
    & td:nth-child(1) {
      width: 3.5rem;
      background-color: ${({ theme }) => theme.colors.Lime[50]};
      color: ${({ theme }) => theme.colors.Lime[700]};
    }

    & td:nth-child(2) {
      background-color: white;
    }
  }
`;

const StyledTestSubmitBtn = styled(StyledCommonBtn)`
  margin: 1.5rem 0rem;
  width: 100%;
  border-radius: 0.5rem;
`;

const StyledTestProblemShortAnswer = styled.input`
  width: 54.5rem;
  height: 3.5rem;
  line-height: 3.5rem;
  padding: 0rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.Gray[50]};
  border: none;
  border-radius: 0.5rem;

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.Gray[500]};
    padding: 0rem 1.5rem;
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.Gray[500]};
  }
`;

const StyledTestProblemEssayAnswer = styled.textarea`
  width: 54.5rem;
  height: 11.5rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.Gray[50]};
  border: none;
  border-radius: 0.5rem;
  resize: none;

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.Gray[500]};
    padding: 1.5rem;
    outline: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.Gray[500]};
  }
`;

const StyledTestProblemOXAnswer = styled.div<{ selectedMenu: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  .correct-icon {
    width: 9.25rem;
    height: 9.25rem;
    color: ${({ selectedMenu, theme }) =>
      selectedMenu === "correct" ? theme.colors.Orange[600] : theme.colors.Gray[600]};
  }

  .wrong-icon {
    width: 11.5rem;
    height: 11.5rem;
    color: ${({ selectedMenu, theme }) =>
      selectedMenu === "wrong" ? theme.colors.Orange[600] : theme.colors.Gray[600]};
  }
`;

export {
  StyledTestContainer,
  StyledAnswerBox,
  StyledTestHeader,
  StyledTestHeaderContentBox,
  StyledTestHeaderTitle,
  StyledTestHeaderText,
  StyledTestContent,
  StyledTestProblemBox,
  StyledTestProblemTitle,
  StyledTestProblemTitleLabel,
  StyledTestProblemTitleContent,
  StyledTestProblemText,
  StyledTestProblemMultipleChoiceAnswer,
  StyledTestProblemAnswerNumber,
  StyledTestNumberBtn,
  StyledTestNumberText,
  StyledUsername,
  StyledTestAnswerTable,
  StyledTestSubmitBtn,
  StyledTestProblemShortAnswer,
  StyledTestProblemEssayAnswer,
  StyledTestProblemOXAnswer,
};
