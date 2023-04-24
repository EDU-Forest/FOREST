import { ExportBtnInner, StyledExportBtn } from "./Btn.style";
import RadioBtn from "./RadioBtn";
import { AiOutlineEdit, AiOutlineShareAlt, AiOutlineFilePdf } from "react-icons/ai";

interface Iprops {
  type: string;
  selected: boolean;
}

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
