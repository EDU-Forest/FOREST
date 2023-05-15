import styled, { css } from "styled-components";
import { CommonInput } from "@/components/Input/Input.style";
import {
  ClassSelectDropdownContainer,
  ClassSelectDropdownEach,
  ClassSelectDropdownEachItem,
} from "../ClassSelect.style";
import { ClassAddModalContainer, ClassInputBtnWrapper } from "./AddClassModal.style";

const ClassStudentAddModalContainer = styled(ClassAddModalContainer)`
  z-index: 30;
  height: 37.5rem;
  padding-top: 4.375rem;
`;

const ClassStudentAddInput = styled(CommonInput)`
  width: 30rem;
  margin-top: 1.5rem;
`;

const ClassStudentDeleteIcon = styled.p`
  position: absolute;
  top: 2.1rem;
  right: 1rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.Gray[600]};
`;

const ClassStudentAddDropdown = styled(ClassSelectDropdownContainer)`
  width: 30rem;
  max-height: 20rem;
`;
const ClassStudentAddDropdownEach = styled(ClassSelectDropdownEach)`
  width: 30rem;
`;
const ClassStudentAddDropdownEachItem = styled(ClassSelectDropdownEachItem)<{ disabled?: boolean }>`
  width: 30rem;
  position: relative;
  cursor: pointer;
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;

      &:hover {
        background-color: #f8f9fa;
      }
    `}
`;

const ClassStudentCheckIcon = styled.p`
  color: ${({ theme }) => theme.colors.Lime[600]};
  font-size: 1rem;
  position: absolute;
  top: 0.5rem;
  left: 1.5rem;
`;

const ClassStudentAddName = styled.p`
  display: inline-block;
  font-weight: 700;
  font-size: 0.875rem;
  width: 6rem;
`;

const ClassStudentAddEmail = styled.p`
  display: inline-block;
  width: 20rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.Gray[500]};
  text-align: left;
`;

const ClassStudentRemoveIcon = styled.p`
  color: ${({ theme }) => theme.colors.Orange[600]};
  font-size: 1rem;
  cursor: pointer;
`;
const ClassStudentAddList = styled.div`
  width: 30rem;
  height: 17.5rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
  margin-top: 2rem;
`;

const ClassStudentAddBtnWrapper = styled(ClassInputBtnWrapper)`
  margin-top: 1rem;
`;

export {
  ClassStudentAddModalContainer,
  ClassStudentAddInput,
  ClassStudentAddDropdown,
  ClassStudentAddDropdownEach,
  ClassStudentAddDropdownEachItem,
  ClassStudentAddName,
  ClassStudentAddEmail,
  ClassStudentDeleteIcon,
  ClassStudentCheckIcon,
  ClassStudentRemoveIcon,
  ClassStudentAddList,
  ClassStudentAddBtnWrapper,
};
