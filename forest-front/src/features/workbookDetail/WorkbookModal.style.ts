import { CommonInput } from "@/components/Input/Input.style";
import { theme } from "./../../styles/theme";
import { ModalBox } from "@/styles/modal";
import styled from "styled-components";

// 내보내기 유형 선택 모달
export const WorkbookExportModalBox = styled(ModalBox)`
  gap: 1.5rem;
`;

// 출제할 클래스 선택 모달
export const WorkbookSelectClassModalBox = styled(ModalBox)`
  width: 640px;
  max-height: 640px;

  padding: 0 80px;
  padding-top: 64px;
  padding-bottom: 48px;

  // 모달 타이틀
  > p:first-child {
    margin-bottom: 48px;
  }
`;

export const WorkbookExportRadioBox = styled.div`
  display: flex;

  gap: 32px;
`;

export const WorkbookExportRadioCircle = styled.div`
  /*  */
  position: absolute;
  top: 25%;
  left: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 1px solid #ccc;
`;

export const WorkbookExportRadioLabel = styled.label<{ isChecked: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 1rem 2rem;

  background: ${({ theme, isChecked }) => (isChecked ? theme.colors.Lime[50] : "white")};
  border: 0.0625rem solid
    ${({ theme, isChecked }) => (isChecked ? theme.colors.Lime[700] : theme.colors.Gray[500])};
  color: ${({ theme, isChecked }) => (isChecked ? theme.colors.Lime[700] : theme.colors.Gray[500])};
  font-weight: bold;
  border-radius: 1rem;

  cursor: pointer;

  svg {
    width: 32px;
    height: 32px;

    margin-bottom: 8px;
  }
`;

export const WorkbookClassBtnsBox = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 16px;
  overflow: auto;
`;

export const WorkbookClassBtn = styled.button<{ isSelected: boolean }>`
  min-width: 25rem;

  padding: 12px 1rem;

  background: ${({ theme, isSelected }) => (isSelected ? theme.colors.Lime[700] : "white")};
  border: 2px solid ${({ theme }) => theme.colors.Lime[700]};
  border-radius: 24px;
  font-weight: 600;
  color: ${({ theme, isSelected }) => (isSelected ? "white" : theme.colors.Lime[700])};

  @media ${({ theme }) => theme.tablet} {
    min-width: 25rem;
  }
`;

export const WorkbookClassModalFooterBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;

  gap: 1.5rem;
  margin-top: 72px;

  // 클래스 선택 문구
  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.Gray[500]};
  }

  // 버튼
  > div {
    margin-top: 0 !important;
  }
`;

// 출제 세팅 모달
export const WorkbookSettingModalBox = styled(ModalBox)`
  width: 640px;
  min-height: 640px;

  padding: 0 80px;
  padding-top: 64px;
  padding-bottom: 48px;

  > div {
    width: 100%;
  }

  p {
    margin-bottom: 1rem;

    color: ${({ theme }) => theme.colors.Gray[500]};
  }

  hr {
    width: 100%;
    height: 0.8px;

    margin: 24px 0;

    background-color: ${({ theme }) => theme.colors.Gray[300]};
    border: none;
  }
`;

export const WorkbookSettingTitleInput = styled.input`
  width: 100%;

  padding: 0.25rem 0.5rem;
  margin-bottom: 3rem;

  border: none;
  font-size: 22px;
  font-weight: bold;
  text-align: center;

  ::placeholder {
    color: ${({ theme }) => theme.colors.Gray[500]};
  }

  :focus {
    outline: 0.5px solid ${({ theme }) => theme.colors.Gray[500]};
    border-radius: 4px;
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

    :disabled {
      background: transparent;
      color: ${({ theme }) => theme.colors.Gray[300]};
    }
  }

  /* input[type="time"]::-webkit-datetime-edit-hour-field {
    background-color: #f2f4f5;
    border-radius: 15%;
    padding: 19px 13px;
  }
  input[type="time"]::-webkit-datetime-edit-minute-field {
    background-color: #f2f4f5;
    border-radius: 15%;
    padding: 19px 13px;
  } */

  /* input[type="time"]::-webkit-inner-spin-button {
    display: none;
  } */

  /* input[type="time"]::-webkit-calendar-picker-indicator {
    border: 1px solid red;
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

  gap: 32px;

  input {
    margin-right: 8px;
  }
`;

export const WorkbookSettingModalInputsBox = styled.div`
  display: flex;
  flex-direction: column;

  gap: 24px;
`;

export const WorkbookSettingModalTimeBox = styled.div<{ disabled: boolean }>`
  > p {
    color: ${({ theme, disabled }) => disabled && theme.colors.Gray[300]};
  }
`;
