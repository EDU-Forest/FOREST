import { MdOutlineFileCopy } from "react-icons/md";
import { StyledFileInputLabel, StyledFileInput } from "./Input.style";

interface Iprops {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  text: string;
}

export default function FileInput({ onChange, text }: Iprops) {
  return (
    <StyledFileInputLabel id="pdfInput">
      <MdOutlineFileCopy />
      {text}
      <StyledFileInput id="pdfInput" onChange={onChange} type="file" accept="image/*, .pdf" />
    </StyledFileInputLabel>
  );
}
