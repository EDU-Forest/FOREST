import { CommonInput } from "@/components/Input/Input.style";
import styled from "styled-components";
import {
  StyledQuestionChoiceNumBox,
  StyledQuestionDetailChoiceBox,
  StyledQuestionDetailChoiceListBox,
} from "../workbookDetail/WorkbookDetail.style";

export const EditorQuestionContentBox = styled.div`
  display: flex;
  flex-direction: column;

  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.Lime[600]};

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

  padding: 0.375rem 2rem;

  background: ${({ theme }) => theme.colors.Lime[600]};
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

export const EditorNumAndPointBox = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    margin-right: 1rem;
    color: ${({ theme }) => theme.colors.Gray[600]};
  }
`;

export const EditorPointInput = styled(CommonInput)`
  width: 3.5rem;
  padding: 0.25rem 0.5rem;
`;

export const EditorPointBox = styled.div``;

export const EditorQuestionTitleInput = styled.input`
  width: 100%;

  font-size: 22px;
  font-weight: bold;
`;

export const EditorQuestionItemAddButton = styled.button`
  display: flex;
  align-items: center;
  flex: 1;

  padding: 0.25rem 0.5rem;
  gap: 8px;
  margin-top: 0.5rem;

  border: 0.0625rem dashed ${({ theme }) => theme.colors.Lime[600]};
  border-radius: 0.25rem;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.Lime[600]};
  font-size: 0.875rem;

  // circle icon
  > div {
    width: 1.5rem;
    height: 1.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.Lime[100]};
    font-size: 0.875rem;
    font-weight: bold;
  }
`;

export const EditorQuestionChoiceListBox = styled(StyledQuestionDetailChoiceListBox)`
  // 부모 패딩 무시
  width: calc(100% + 1.5rem * 2);
  margin: 1.5rem 0 1.5rem -1.5rem;

  gap: 0.5rem;
  padding-left: 16px;
  padding-right: 24px;
  margin-top: 16px;

  > div {
    display: flex;
    align-items: center;
  }

  // 마이너스 아이콘
  > div > svg {
    width: 1.5rem;
    height: 1.5rem;

    fill: ${({ theme }) => theme.colors.Orange[600]};
  }
`;

export const EditorQuestionChoiceBox = styled(StyledQuestionDetailChoiceBox)<{
  isCorrect: boolean;
}>`
  width: 100%;

  padding: 0.25rem 0.5rem;
  margin-right: 8px;

  background-color: ${({ theme, isCorrect }) => isCorrect && theme.colors.Orange[600]};
  border-radius: 0.25rem;
  justify-content: space-between;

  input {
    width: 100%;
    padding: 0;
    color: ${({ isCorrect }) => isCorrect && "white"};

    ::placeholder {
      color: ${({ isCorrect }) => isCorrect && "white"};
    }
  }

  > svg {
    width: 1rem;
    height: 1rem;

    fill: white;
  }
`;

export const EditorChoiceNumBox = styled(StyledQuestionChoiceNumBox)<{ isCorrect: boolean }>`
  border: 0.05rem solid ${({ theme, isCorrect }) => isCorrect && theme.colors.Orange[50]};
  background-color: ${({ theme, isCorrect }) => isCorrect && theme.colors.Orange[50]};
  color: ${({ theme, isCorrect }) => isCorrect && theme.colors.Orange[600]};
  cursor: pointer;
`;

// 단답식
export const EditorShortAnswerBox = styled.div`
  margin-top: 24px;

  > input {
    width: 100%;

    padding: 16px 24px;

    color: ${({ theme }) => theme.colors.Orange[500]};
    background: ${({ theme }) => theme.colors.Orange[50]};
    border: 0.05rem solid ${({ theme }) => theme.colors.Orange[300]};
    border-radius: 0.5rem;

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
  font-size: 7.5rem;
  font-weight: 900;
  color: ${({ theme, isAnswer }) => (isAnswer ? theme.colors.Orange[600] : theme.colors.Gray[400])};
  cursor: pointer;
`;

// 서술형
export const EditorEssayKeywordsBox = styled.div`
  display: flex;
  flex-flow: wrap;

  gap: 8px;

  input {
    width: fit-content;
    width: 5rem;
    padding: 4px 8px;

    outline: none;
    border: none;
    background: ${({ theme }) => theme.colors.Orange[500]};
    border-radius: 0.25rem;
    color: white;

    ::placeholder {
      color: white;
    }
  }

  button {
    padding: 4px 8px;

    background: ${({ theme }) => theme.colors.Orange[50]};
    color: ${({ theme }) => theme.colors.Orange[500]};
    border: 0.0313rem solid ${({ theme }) => theme.colors.Orange[500]};
    border-radius: 0.25rem;

    > span {
      font-weight: bold;
    }
  }
`;

export const EditorEssayBox = styled.div`
  p {
    margin-top: 24px;
    margin-bottom: 8px;

    color: ${({ theme }) => theme.colors.Gray[500]};
  }
`;

export const EditorQuestionTextInput = styled.textarea`
  width: 100%;

  padding: 24px !important;
  margin: 24px 0 !important;

  border: 0.0625rem solid ${({ theme }) => theme.colors.Lime[600]} !important;
  border-radius: 0.25rem !important;
  line-height: 1.75rem !important;
  outline: none;
  resize: none;

  ::placeholder {
    color: black !important;
  }
`;

export const EditorQuestionImgBox = styled.div`
  height: 10rem;

  display: flex;
  justify-content: center;

  img {
    width: auto;
    height: 100%;
  }

  input {
    display: none;
  }

  label {
    cursor: pointer;
  }
`;

export const EditorQuestionImgAddedBox = styled.div`
  position: relative;

  label {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;

    padding: 0.25rem 0.5rem;

    font-size: 0.75rem !important;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 0.25rem;
    color: white;
    text-align: center;
  }
`;

export const EditorQuestionInputBox = styled(EditorQuestionItemAddButton)`
  justify-content: center;

  label {
    padding: 0.5rem 1rem;

    font-weight: bold;
    text-align: center;
    justify-content: center;
    font-size: 16px;
    background-color: ${({ theme }) => theme.colors.Lime[100]};
    color: ${({ theme }) => theme.colors.Lime[600]};
    border-radius: 0.25rem;
  }
`;

export const EditorQuestionImgBtn = styled.label`
  padding: 0.5rem 1rem;

  font-weight: bold;
  text-align: center;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.Lime[100]};
  color: ${({ theme }) => theme.colors.Lime[600]};
  border-radius: 0.25rem;

  cursor: pointer;
`;

export const EditorItemToggleBtnBox = styled.div<{ selected: number; isCorrect: boolean }>`
  display: flex;
  cursor: pointer;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 4px;

    border: 0.0625rem solid
      ${({ theme, isCorrect }) => (isCorrect ? theme.colors.Orange[200] : theme.colors.Lime[600])};
  }

  svg {
    width: 0.875rem;
    height: 0.875rem;
  }

  // 텍스트 버튼
  > div:nth-child(1) {
    background: ${({ theme, selected, isCorrect }) =>
      selected !== 1 ? "#ffffff" : isCorrect ? theme.colors.Orange[200] : theme.colors.Lime[600]};
    border-radius: 0.125rem 0rem 0rem 0.125rem;

    svg {
      fill: ${({ theme, selected, isCorrect }) =>
        isCorrect ? theme.colors.Orange[600] : selected === 1 ? "#ffffff" : theme.colors.Lime[600]};
    }
  }
  // 이미지 버튼
  > div:nth-child(2) {
    background: ${({ theme, selected, isCorrect }) =>
      selected !== 2 ? "#ffffff" : isCorrect ? theme.colors.Orange[200] : theme.colors.Lime[600]};
    border-radius: 0rem 0.125rem 0.125rem 0rem;

    svg {
      fill: ${({ theme, selected }) => (selected === 2 ? "#ffffff" : theme.colors.Lime[600])};

      // 셀렉되지 않은 경우 -> 라임(정답 아님), 오렌지(정답임)
      // 셀렉된 경우 -> 화이트(정답 아님), 오렌지(정답임)
      fill: ${({ theme, selected, isCorrect }) =>
        isCorrect ? theme.colors.Orange[600] : selected === 2 ? "#ffffff" : theme.colors.Lime[600]};
    }
  }
`;
