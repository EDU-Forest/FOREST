import { scrollBar } from "./../../styles/theme";
import { theme } from "@/styles/theme";
import { Container, FullScreen } from "@/styles/container";
import styled from "styled-components";
import { StyledWorkbookDetailBtnsBox } from "../workbookDetail/WorkbookDetail.style";
import { ClassSelectWrapper, ClassSelectedTitle } from "../class/ClassSelect.style";

export const EditorFullScreen = styled(FullScreen)``;

export const EditorContainer = styled(Container)`
  display: flex;

  padding: 32px;
  gap: 24px;

  @media ${({ theme }) => theme.tablet} {
    /* width: auto !important; */
    /* width: calc(100% - 14rem) !important; */
    width: calc(100% - 10.75rem) !important;
  }
`;

export const EditorTitleAndQuestionBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const EditorBtnsAndListBox = styled.div`
  width: 240px;

  display: flex;
  flex-direction: column;
`;

export const QuestionEditAreaBox = styled.div`
  flex: 1;

  padding: 2.5rem;

  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;

  overflow: auto;
  ${scrollBar(0.75)}

  /* 빈 화면 문구  */
  > span {
    display: flex;
    justify-content: center;

    color: ${({ theme }) => theme.colors.Lime[600]};
  }
`;

export const EditorBtnsBox = styled(StyledWorkbookDetailBtnsBox)`
  width: auto;
  min-width: auto;
  display: flex;

  margin: 0;

  > button {
    width: 100%;
  }
`;

export const EditorTitleBox = styled(ClassSelectWrapper)`
  padding-bottom: 1rem;
`;

export const EditorSelectedTitle = styled(ClassSelectedTitle)`
  display: flex;
  color: ${({ theme }) => theme.colors.Gray[700]};

  p:hover,
  svg:hover {
    color: ${({ theme }) => theme.colors.Gray[900]};
  }

  p {
    cursor: pointer;
  }
`;
