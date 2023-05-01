import styled from "styled-components";
import {
  StyledQuestionChoiceNumBox,
  StyledQuestionDetailChoiceBox,
  StyledQuestionDetailChoiceListBox,
} from "../workbookDetail/WorkbookDetail.style";

export const EditorQuestionContentBox = styled.div`
  display: flex;
  flex-direction: column;
  /* flex: 1; */

  padding: 1.5rem 0;
  border: 0.0625rem solid ${({ theme }) => theme.colors.Lime[600]};

  input {
    padding: 0 1.5rem;

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

export const EditorQuestionTitleInput = styled.input`
  width: 100%;

  font-size: 1.375rem;
  font-weight: bold;
`;

export const EditorQuestionItemAddButton = styled.button`
  display: flex;
  align-items: center;
  flex: 1;

  margin: 0 1rem;
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
  margin: 0 1.5rem;
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
