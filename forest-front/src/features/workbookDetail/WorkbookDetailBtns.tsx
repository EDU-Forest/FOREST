import { StyledRoundGhostBtn } from "@/components/Button/Btn.style";
import { useState } from "react";
import { MdOutlineFileCopy, MdOutlineFileUpload, MdSave } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import { StyledWorkbookDetailBtnsBox, WorkbookSaveBtn } from "./WorkbookDetail.style";

function WorkbookDetailBtns() {
  // dummy: save loadin action
  const [saveLoading, setSaveLoading] = useState(false);

  const handleClickSave = () => {
    // save api call
    // dummy: during saving action
    setSaveLoading(true);

    setTimeout(() => {
      setSaveLoading(false);
    }, 1000);
  };

  const handleClickCopy = () => {
    // copy api call
  };

  const handleClickExport = () => {
    // export api call
  };

  return (
    <StyledWorkbookDetailBtnsBox>
      <WorkbookSaveBtn onClick={handleClickSave} >
        {saveLoading ? (
          <>
            <ClipLoader color="white" size={18} speedMultiplier={0.7}/>
            저장 중
          </>
        ) : (
          <>
            <MdSave />
            저장
          </>
        )}
      </WorkbookSaveBtn>
      <StyledRoundGhostBtn>
        <MdOutlineFileCopy onClick={handleClickCopy} />
        사본
      </StyledRoundGhostBtn>

      <StyledRoundGhostBtn>
        <MdOutlineFileUpload onClick={handleClickExport} />
        내보내기
      </StyledRoundGhostBtn>
    </StyledWorkbookDetailBtnsBox>
  );
}

export default WorkbookDetailBtns;
