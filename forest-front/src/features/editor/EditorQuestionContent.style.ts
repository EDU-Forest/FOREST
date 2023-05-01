import styled from "styled-components";

export const EditorQuestionContentBox = styled.div`
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

export const EditorQuestionTitleInput = styled.input`
  margin-bottom: 16px;

  font-size: 1.375rem;
  font-weight: bold;
`;
