import { Container } from "@/styles/container";
import styled from "styled-components";

export const EditorContainer = styled(Container)`
  display: flex;
`

export const EditorTitleAndQuestionBox = styled.div`
  height: 100vh;

  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const QuestionEditAreaBox = styled.div`
  flex: 1;

  padding: 2.5rem;

  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;
