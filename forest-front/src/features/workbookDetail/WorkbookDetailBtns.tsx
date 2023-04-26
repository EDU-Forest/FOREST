import { StyledRoundGhostBtn, StyledRoundSolid600Btn } from "@/components/Button/Btn.style";
import { MdOutlineFileCopy, MdOutlineFileUpload, MdSave } from "react-icons/md";
import { StyledWorkbookDetailBtnsBox } from "./WorkbookDetail.style";

function WorkbookDetailBtns() {
  return (
    <StyledWorkbookDetailBtnsBox>
      <StyledRoundSolid600Btn>
        <MdSave />
        저장
      </StyledRoundSolid600Btn>
      <StyledRoundGhostBtn>
        <MdOutlineFileCopy />
        사본
      </StyledRoundGhostBtn>

      <StyledRoundGhostBtn>
        <MdOutlineFileUpload />
        내보내기
      </StyledRoundGhostBtn>
    </StyledWorkbookDetailBtnsBox>
  );
}

export default WorkbookDetailBtns;
