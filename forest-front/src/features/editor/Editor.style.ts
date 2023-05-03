import { Container } from "@/styles/container";
import styled from "styled-components";
import { StyledWorkbookDetailBtnsBox } from "../workbookDetail/WorkbookDetail.style";

export const EditorContainer = styled(Container)`
  display: flex;

  padding: 32px;
  gap: 24px;
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