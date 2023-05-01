import { MdOutlineFileCopy } from "react-icons/md";
import { StyledFileInputLabel, StyledFileInput } from "./Input.style";

interface Iprops {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function FileInput({ onChange }: Iprops) {
  return (
    <StyledFileInputLabel id="pdfInput">
      <MdOutlineFileCopy />
      PDF 또는 이미지 불러오기
      <StyledFileInput id="pdfInput" onChange={onChange} type="file" />
    </StyledFileInputLabel>
  );
}
