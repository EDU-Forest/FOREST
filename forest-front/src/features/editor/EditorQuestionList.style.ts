import { theme } from "./../../styles/theme";
import styled from "styled-components";
import { StyledWorkbookDetailQuestionListContentBox } from "../workbookDetail/WorkbookDetail.style";

export const EditorQuestionListBox = styled(StyledWorkbookDetailQuestionListContentBox)`
  width: 240px;

  flex: 1 !important;
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
