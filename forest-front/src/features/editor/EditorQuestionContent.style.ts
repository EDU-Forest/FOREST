import { CommonInput } from "@/components/Input/Input.style";
import styled from "styled-components";
import {
  StyledQuestionChoiceNumBox,
  StyledQuestionDetailChoiceBox,
  StyledQuestionDetailChoiceListBox,
  StyledQuestionDetailTextBox,
} from "../workbookDetail/WorkbookDetail.style";

export const EditorQuestionContentBox = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1.5rem;
  border: 0.0625rem solid ${({ theme }) => theme.colors.Lime[600]};

  input {
    border: none;
    background-color: transparent;
    outline: none;

    ::placeholder {
      color: black;
    }
  }
`;

export const EditorQuestionNumbox = styled.div`
  width: fit-content;

  padding: 6px 32px;

  background: ${({ theme }) => theme.colors.Lime[600]};
  border-radius: 8px 8px 0px 0px;
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
`;

export const EditorNumAndPointBox = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    margin-right: 16px;
    color: ${({ theme }) => theme.colors.Gray[600]};
  }
`;

export const EditorPointInput = styled(CommonInput)`
  width: 56px;
  padding: 4px 8px;
`;

export const EditorPointBox = styled.div``;

export const EditorQuestionTitleInput = styled.input`
  width: 100%;

  font-size: 1.375rem;
  font-weight: bold;
`;

export const EditorQuestionItemAddButton = styled.button`
  display: flex;
  align-items: center;
  flex: 1;

  padding: 4px 8px;
  gap: 0.5rem;
  margin-top: 8px;

  border: 1px dashed ${({ theme }) => theme.colors.Lime[600]};
  border-radius: 4px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.Lime[600]};
  font-size: 14px;

  // circle icon
  > div {
    width: 24px;
    height: 24px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.Lime[100]};
    font-size: 14px;
    font-weight: bold;
  }
`;

export const EditorQuestionChoiceListBox = styled(StyledQuestionDetailChoiceListBox)`
  // 부모 패딩 무시
  width: calc(100% + 24px * 2);
  margin: 24px 0 24px -24px;

  gap: 8px;
  padding: 0 1rem;
  margin-top: 1rem;

  > div {
    display: flex;
    align-items: center;
  }

  // 마이너스 아이콘
  > div > svg {
    width: 24px;
    height: 24px;

    fill: ${({ theme }) => theme.colors.Orange[600]};
  }
`;

export const EditorQuestionChoiceBox = styled(StyledQuestionDetailChoiceBox)<{
  isCorrect: boolean;
}>`
  width: 100%;

  padding: 4px 8px;
  margin-right: 0.5rem;

  background-color: ${({ theme, isCorrect }) => isCorrect && theme.colors.Orange[600]};
  border-radius: 4px;

  input {
    width: 100%;
    padding: 0;
    color: ${({ isCorrect }) => isCorrect && "white"};

    ::placeholder {
      color: ${({ isCorrect }) => isCorrect && "white"};
    }
  }

  > svg {
    width: 16px;
    height: 16px;

    fill: white;
  }
`;

export const EditorChoiceNumBox = styled(StyledQuestionChoiceNumBox)<{ isCorrect: boolean }>`
  border: 0.8px solid ${({ theme, isCorrect }) => isCorrect && theme.colors.Orange[50]};
  background-color: ${({ theme, isCorrect }) => isCorrect && theme.colors.Orange[50]};
  color: ${({ theme, isCorrect }) => isCorrect && theme.colors.Orange[600]};
  cursor: pointer;
`;

// 단답식
export const EditorShortAnswerBox = styled.div`
  margin-top: 1.5rem;

  > input {
    width: 100%;

    padding: 1rem 1.5rem;

    color: ${({ theme }) => theme.colors.Orange[500]};
    background: ${({ theme }) => theme.colors.Orange[50]};
    border: 0.8px solid ${({ theme }) => theme.colors.Orange[300]};
    border-radius: 8px;

    ::placeholder {
      color: ${({ theme }) => theme.colors.Orange[500]};
    }
  }
`;

export const EditorOXBox = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const EditorOXAnswerBox = styled.div<{ isAnswer: boolean }>`
  font-size: 120px;
  font-weight: 900;
  color: ${({ theme, isAnswer }) => (isAnswer ? theme.colors.Orange[600] : theme.colors.Gray[400])};
  cursor: pointer;
`;

// 서술형
export const EditorEssayKeywordsBox = styled.div`
  display: flex;
  flex-flow: wrap;

  gap: 0.5rem;

  input {
    width: fit-content;
    width: 80px;
    padding: 0.25rem 0.5rem;

    outline: none;
    border: none;
    background: ${({ theme }) => theme.colors.Orange[500]};
    border-radius: 4px;
    color: white;

    ::placeholder {
      color: white;
    }
  }

  button {
    padding: 0.25rem 0.5rem;

    background: ${({ theme }) => theme.colors.Orange[50]};
    color: ${({ theme }) => theme.colors.Orange[500]};
    border: 0.5px solid ${({ theme }) => theme.colors.Orange[500]};
    border-radius: 4px;

    > span {
      font-weight: bold;
    }
  }
`;

export const EditorEssayBox = styled.div`
  p {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;

    color: ${({ theme }) => theme.colors.Gray[500]};
  }
`;

export const EditorQuestionTextInput = styled.input`
  width: 100%;

  padding: 1.5rem !important;
  margin-top: 1.5rem !important;
  margin: 0 1.5rem;

  border: 1px solid ${({ theme }) => theme.colors.Lime[600]} !important;
  border-radius: 4px !important;
  line-height: 28px !important;
`;
