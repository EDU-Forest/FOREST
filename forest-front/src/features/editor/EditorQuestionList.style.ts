import styled from "styled-components";
import { StyledWorkbookDetailQuestionListContentBox } from "../workbookDetail/WorkbookDetail.style";

export const EditorQuestionListBox = styled(StyledWorkbookDetailQuestionListContentBox)`
  width: 240px;

  flex: 1 !important;

  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;

  display: flex;
  flex: 1;
  flex-direction: column;

  padding: 24px;

  /* 빈 화면 문구  */
  > span {
    display: flex;
    justify-content: center;

    color: ${({ theme }) => theme.colors.Lime[600]};
  }
`;

export const EditorQuestionBarBox = styled.div<{ isCur: boolean }>`
  display: flex;

  padding: 0.5rem 1rem;

  background: ${({ theme, isCur }) => (isCur ? theme.colors.Lime[600] : theme.colors.Gray[100])};
  color: ${({ isCur }) => isCur && "white"};
  border-radius: 20px;

  // 문제 번호
  > span:first-child {
    font-weight: bold;
  }

  // 문제명
  > span:nth-child(2) {
    white-space: nowrap;
    max-width: 8rem;
    overflow: hidden;
    text-overflow: ellipsis;

    @media ${({ theme }) => theme.tablet} {
      max-width: 48px;
    }
  }

  // delete icon
  > svg {
    width: 16px;
    min-width: 16px;
    height: 16px;

    display: flex;
    margin-left: auto;
    fill: ${({ isCur, theme }) => (isCur ? "white" : theme.colors.Gray[600])};
  }
`;
