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

export const WorkbookExportRadioLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 1rem 2rem;

  background: ${({ theme }) => theme.colors.Lime[50]};
  /* background: ${({ theme }) => theme.colors.Gray[500]};; */
  border: 0.0625rem solid ${({ theme }) => theme.colors.Lime[700]};
  /* border: 0.0625rem solid ${({ theme }) => theme.colors.Gray[500]}; */
  color: ${({ theme }) => theme.colors.Lime[700]};
  font-weight: bold;
  border-radius: 1rem;
`;