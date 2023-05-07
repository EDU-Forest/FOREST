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
  padding: 0.5rem 1rem;

  background: ${({ theme, isCur }) => (isCur ? theme.colors.Lime[600] : theme.colors.Gray[100])};
  color: ${({ isCur }) => isCur && "white"};
  border-radius: 20px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  // 문제 번호
  > span:first-child {
    font-weight: bold;
  }
`;
