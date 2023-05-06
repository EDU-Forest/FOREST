import { CommonInput } from "@/components/Input/Input.style";
import { theme } from "./../../styles/theme";
import { ModalBox } from "@/styles/modal";
import styled from "styled-components";

// 내보내기 유형 선택 모달
export const WorkbookExportModalBox = styled(ModalBox)`
  gap: 24px;
`;

// 출제할 클래스 선택 모달
export const WorkbookSelectClassModalBox = styled(ModalBox)`
  width: 40rem;
  max-height: 40rem;

  padding: 0 5rem;
  padding-top: 4rem;
  padding-bottom: 3rem;

  // 모달 타이틀
  > p:first-child {
    margin-bottom: 3rem;
  }
`;

export const WorkbookExportRadioBox = styled.div`
  display: flex;

  gap: 2rem;
`;

export const WorkbookExportRadioCircle = styled.div`
  /*  */
  position: absolute;
  top: 25%;
  left: 0.25rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: white;
  border: 0.0625rem solid #ccc;
`;

export const WorkbookExportRadioLabel = styled.label<{ isDisabled: boolean; isChecked: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 16px 32px;

  background: ${({ theme, isDisabled, isChecked }) =>
    isDisabled ? theme.colors.Gray[100] : isChecked ? theme.colors.Lime[50] : "white"};
  border: 1px solid
    ${({ theme, isChecked }) => (isChecked ? theme.colors.Lime[700] : theme.colors.Gray[500])};
  color: ${({ theme, isChecked }) => (isChecked ? theme.colors.Lime[700] : theme.colors.Gray[500])};
  font-weight: bold;
  border-radius: 16px;

  cursor: pointer;

  svg {
    width: 2rem;
    height: 2rem;

    margin-bottom: 0.5rem;
  }
`;

export const WorkbookClassBtnsBox = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 1rem;
  overflow: auto;
`;

export const WorkbookClassBtn = styled.button<{ isSelected: boolean }>`
  min-width: 400px;

  padding: 0.75rem 16px;

  background: ${({ theme, isSelected }) => (isSelected ? theme.colors.Lime[700] : "white")};
  border: 0.125rem solid ${({ theme }) => theme.colors.Lime[700]};
  border-radius: 1.5rem;
  font-weight: 600;
  color: ${({ theme, isSelected }) => (isSelected ? "white" : theme.colors.Lime[700])};

  @media ${({ theme }) => theme.tablet} {
    min-width: 400px;
  }
`;

export const WorkbookClassModalFooterBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;

  gap: 24px;
  margin-top: 4.5rem;

  // 클래스 선택 문구
  p {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.Gray[500]};
  }

  // 버튼
  > div {
    margin-top: 0 !important;
  }
`;

// 출제 세팅 모달
export const WorkbookSettingModalBox = styled(ModalBox)`
  width: 40rem;
  min-height: 40rem;

  padding: 0 5rem;
  padding-top: 4rem;
  padding-bottom: 3rem;

  > div {
    width: 100%;
  }

  p {
    margin-bottom: 16px;

    color: ${({ theme }) => theme.colors.Gray[500]};
  }

  hr {
    width: 100%;
    height: 0.05rem;

    margin: 1.5rem 0;

    background-color: ${({ theme }) => theme.colors.Gray[300]};
    border: none;
  }
`;

export const WorkbookSettingTitleInput = styled.input`
  width: 100%;

  padding: 4px 8px;
  margin-bottom: 48px;

  border: none;
  font-size: 1.375rem;
  font-weight: bold;
  text-align: center;

  ::placeholder {
    color: ${({ theme }) => theme.colors.Gray[500]};
  }

  :focus {
    outline: 0.0313rem solid ${({ theme }) => theme.colors.Gray[500]};
    border-radius: 0.25rem;
  }
`;

export const WorkbookSettingTimeInputBox = styled(CommonInput)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > input {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;

    :disabled {
      background: transparent;
      color: ${({ theme }) => theme.colors.Gray[300]};
    }
  }

  /* input[type="time"]::-webkit-datetime-edit-hour-field {
    background-color: #f2f4f5;
    border-radius: 15%;
    padding: 1.1875rem .8125rem;
  }
  input[type="time"]::-webkit-datetime-edit-minute-field {
    background-color: #f2f4f5;
    border-radius: 15%;
    padding: 1.1875rem .8125rem;
  } */

  /* input[type="time"]::-webkit-inner-spin-button {
    display: none;
  } */

  /* input[type="time"]::-webkit-calendar-picker-indicator {
    border: .0625rem solid red;
    background-color: red;
    fill: red;
    color: red;
  } */

  // 시간 아이콘
  svg {
    fill: ${({ theme }) => theme.colors.Gray[500]};
    cursor: pointer;
  }
`;

export const WorkbookSettingRadioBox = styled.div`
  display: flex;

  gap: 2rem;

  input {
    margin-right: 0.5rem;
  }
`;

export const WorkbookSettingModalInputsBox = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1.5rem;
`;

export const WorkbookSettingModalTimeBox = styled.div<{ disabled: boolean }>`
  > p {
    color: ${({ theme, disabled }) => disabled && theme.colors.Gray[300]};
  }
`;

export const NotOriginalParagraph = styled.p`
  background-color: ${({ theme }) => theme.colors.Orange[100]};
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.Orange[900]};
  font-size: 0.875rem;
`;
