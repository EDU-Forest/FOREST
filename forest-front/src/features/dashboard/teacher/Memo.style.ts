import styled from "styled-components";

export const StyledMemoUploadInputBox = styled.div`
  display: flex;
  padding: 0.5rem;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colors.Gray[100]};

  background-color: ${({ theme }) => theme.colors.Gray[100]};
  border-radius: 0.625rem;

  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.Gray[500]};
  }

  input {
    width: 100%;

    margin-left: 4px;

    border: none;
    background-color: transparent;
    outline: none;
  }
`;

export const StyledMemoUploadBtn = styled.button`
  width: fit-content;

  display: flex;
  padding: 4px;

  background-color: white;
  border-radius: 50%;
  border: 0.05rem solid ${({ theme }) => theme.colors.Gray[300]};

  svg {
    width: 16px;
    height: 16px;

    fill: ${({ theme }) => theme.colors.Lime[800]};
  }

  :active {
    background-color: ${({ theme }) => theme.colors.Gray[50]};
  }
`;

export const StyledMemoListBox = styled.div`
  margin-top: 1rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const StyledMemoListItemBox = styled.div`
  padding: 16px;

  background-color: ${({ theme }) => theme.colors.Lime[100]};
  border-radius: 16px;

  height: fit-content;

  padding: 16px;
  margin: 10px;
`;

export const StyledMemoListItemTopBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  font-size: 14px;
  color: ${({ theme }) => theme.colors.Lime[900]};

  button {
    padding: 0;

    border: none;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.Lime[700]};
    font-weight: bold;

    :hover {
      color: ${({ theme }) => theme.colors.Lime[900]};
    }

    :active {
      color: ${({ theme }) => theme.colors.Lime[900]};
    }
  }
`;
