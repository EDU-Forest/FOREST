import styled from "styled-components";
import { ClassAddModalContainer, ClassInputBtnWrapper } from "./ClassAddModal.style";
import { StyledCommonInput } from "@/components/Input/Input.style";
import {
  ClassSelectDropdownContainer,
  ClassSelectDropdownEach,
  ClassSelectDropdownEachItem,
} from "../ClassSelect.style";

const ClassStudentAddModalContainer = styled(ClassAddModalContainer)`
  z-index: 10;
  height: 30.625rem;
  padding-top: 4.375rem;
`;

const ClassStudentAddInput = styled(StyledCommonInput)`
  width: 28rem;
  margin-top: 1.5rem;
`;

const ClassStudentAddDropdown = styled(ClassSelectDropdownContainer)`
  width: 30rem;
`;
const ClassStudentAddDropdownEach = styled(ClassSelectDropdownEach)`
  width: 30rem;
`;
const ClassStudentAddDropdownEachItem = styled(ClassSelectDropdownEachItem)`
  width: 30rem;
  cursor: pointer;
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
  ClassStudentAddList,
  ClassStudentAddBtnWrapper,
};
