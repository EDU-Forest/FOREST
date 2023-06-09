import styled, { keyframes } from "styled-components";

export const StyledMemoUploadInputBox = styled.div`
  display: flex;
  padding: 0.5rem;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colors.Gray[100]};

  background-color: ${({ theme }) => theme.colors.Gray[100]};
  border-radius: 0.625rem;
  align-items: center;

  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.Gray[500]};
  }

  textarea {
    width: 100%;

    margin-left: 4px;

    border: none;
    background-color: transparent;
    outline: none;
    resize: none;
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

const bubble = keyframes`
  0% {
    transform: translateY(-10%);
    opacity: 0.5;
  }
  60% {
    transform: translateY(5%);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const StyledMemoListItemBox = styled.div<{ randomTime: number; randomColor: number }>`
  padding: 16px;

  background-color: ${({ theme, randomColor }) =>
    randomColor === 1
      ? theme.colors.Lime[100]
      : randomColor === 2
      ? theme.colors.Lime[200]
      : randomColor === 3 && theme.colors.Lime[300]};
  border-radius: 16px;

  height: fit-content;

  padding: 16px;
  margin: 10px;

  animation: ${bubble} ${({ randomTime }) => randomTime}s ease;
  animation-fill-mode: forwards;
  white-space: pre-wrap;
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

export const MemoContentText = styled.span`
  word-break: break-all;
`;
