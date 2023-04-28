import { ModalBox } from "@/styles/modal";
import styled from "styled-components";

export const WorkbookExportModalBox = styled(ModalBox)``;

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

export const WorkbookClassBtn = styled.button<{ isSelected: boolean }>`
  width: 100%;

  padding: 12px 1rem;

  background: ${({ theme, isSelected }) => (isSelected ? theme.colors.Lime[700] : "white")};
  border: 2px solid ${({ theme }) => theme.colors.Lime[700]};
  border-radius: 24px;
  font-weight: 600;
  color: ${({ theme, isSelected }) => (isSelected ? "white" : theme.colors.Lime[700])};
`;
