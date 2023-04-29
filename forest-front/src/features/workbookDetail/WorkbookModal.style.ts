import { ModalBox } from "@/styles/modal";
import styled from "styled-components";

export const WorkbookExportModalBox = styled(ModalBox)``;

export const WorkbookSelectClassModalBox = styled(ModalBox)`
  max-width: 640px;
  max-height: 640px;

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
  min-width: 30rem;

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
