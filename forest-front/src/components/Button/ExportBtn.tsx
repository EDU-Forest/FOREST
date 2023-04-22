import styled, { css } from "styled-components";
import RadioBtn from "./RadioBtn";
import { AiOutlineEdit, AiOutlineShareAlt, AiOutlineFilePdf } from "react-icons/ai";
import { flexBox } from "@/styles/theme";

interface Iprops {
  type: string;
  selected: boolean;
}

const StyledExportBtn = styled.button<{ selected: boolean }>`
  ${flexBox("column", "center", "center")}
  display: inline-block;
  width: 6.75rem;
  height: 7.5rem;
  font-weight: 700;
  padding-top: 0.5rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.Lime[700]};
  background-color: ${({ theme }) => theme.colors.Lime[50]};
  color: ${({ theme }) => theme.colors.Lime[700]};

  ${({ selected }) =>
    !selected &&
    css`
      background-color: white;
      color: ${({ theme }) => theme.colors.Gray[500]};
      border: 1px solid ${({ theme }) => theme.colors.Gray[500]};
    `}
`;

const ExportBtnInner = styled.div`
  ${flexBox("column", "center", "center")}

  .icon {
    font-size: 2rem;
    margin-top: 0.75rem;
    margin-bottom: 0.375rem;
  }
`;

export default function ExportBtn({ type, selected }: Iprops) {
  const setRadioColor = (selected: boolean) => {
    if (selected) return "green";
    else return "";
  };

  return (
    <StyledExportBtn selected={selected}>
      <RadioBtn selected={selected} color={setRadioColor(selected)} value={"type"} />
      {type === "make" && (
        <ExportBtnInner>
          <AiOutlineEdit className="icon" />
          출제
        </ExportBtnInner>
      )}
      {type === "release" && (
        <ExportBtnInner>
          <AiOutlineShareAlt className="icon" />
          배포
        </ExportBtnInner>
      )}
      {type === "pdf" && (
        <ExportBtnInner>
          <AiOutlineFilePdf className="icon" />
          PDF
        </ExportBtnInner>
      )}
    </StyledExportBtn>
  );
}
