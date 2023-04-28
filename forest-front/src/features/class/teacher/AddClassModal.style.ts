import { flexBox, positionCenter } from "@/styles/theme";
import styled from "styled-components";

const ClassAddModalContainer = styled.div`
  ${positionCenter("fixed")}
  width: 37.5rem;
  height: 20rem;
  background-color: white;
  box-shadow: 0rem 0.25rem 1.25rem rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  padding: 2.5rem 3.75rem;
  text-align: center;
`;

const ClassInputWrapper = styled.div`
  position: relative;
  margin-top: 4.5rem;
`;

const ClassInputCheck = styled.div<{ isSuccess: boolean }>`
  width: 1rem;
  height: 1rem;
  border-radius: 100%;
  border: 2px solid #d9d9d9;
  position: absolute;
  top: 0.875rem;
  right: 1rem;
  background-color: ${({ isSuccess, theme }) => (isSuccess ? theme.colors.Lime[400] : "white")};
`;

const ClassInput = styled.input`
  width: 30rem;
  font-weight: 400;
  border-radius: 0.5rem;
  border: 0.5px solid ${({ theme }) => theme.colors.Gray[500]};
  padding: 0.75rem 1rem;
  background-color: ${({ theme }) => theme.colors.Gray[50]};

  &::placeholder {
    color: ${({ theme }) => theme.colors.Gray[500]};
    font-size: 0.875rem;
  }

  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.Lime[500]};
  }
`;

const ClassInputMsg = styled.div`
  font-weight: 700;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.Orange[400]};
  text-align: left;
  margin-top: 0.25rem;
`;

const ClassInputBtnWrapper = styled.div`
  ${flexBox("row", "center", "space-between")}
  width: 12.75rem;
  margin: auto;
  margin-top: 2rem;
`;

export {
  ClassAddModalContainer,
  ClassInputWrapper,
  ClassInputCheck,
  ClassInput,
  ClassInputMsg,
  ClassInputBtnWrapper,
};
