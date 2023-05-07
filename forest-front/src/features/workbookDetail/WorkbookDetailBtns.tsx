import useWorkbookDetailSaveQuery from "@/apis/workbookDetail/useWorkbookDetailSaveQuery";
import { StyledRoundGhostBtn } from "@/components/Button/Btn.style";
import { RootState } from "@/stores/store";
import { useState } from "react";
import { MdOutlineFileCopy, MdOutlineFileUpload, MdSave } from "react-icons/md";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { StyledWorkbookDetailBtnsBox, WorkbookSaveBtn } from "./WorkbookDetail.style";
import useWorkbookCopyPostQuery from "@/apis/workbookDetail/useWorkbookDetailCopyQuery";

interface IProps {
  setIsExportOpen: React.Dispatch<React.SetStateAction<boolean>>;
  questionSummary: {
    id: number;
    title: string;
  }[];
}

function WorkbookDetailBtns({ setIsExportOpen, questionSummary }: IProps) {
  const { workbook } = useSelector((state: RootState) => state.workbookDetail);
  const { questions } = useSelector((state: RootState) => state.editQuestions);

  const { isLoading, mutate: saveWorkbookApiCall } = useWorkbookDetailSaveQuery();
  const { mutate: copyWorkbookApiCall } = useWorkbookCopyPostQuery(workbook?.workbookId);

  const handleClickSave = () => {
    const workbookInfo = {
      workbookId: workbook?.workbookId,
      title: workbook?.title,
      workbookImgId: workbook?.workbookImgId,
      description: workbook?.description,
    };

    const problemList = questionSummary.map((problem, i) => {
      return {
        problemId: problem.id,
        problemNum: i + 1,
      };
    });

    const data = {
      workbookInfo,
      problemList,
    };

    saveWorkbookApiCall(data);
  };

  const handleClickCopy = () => {
    // copy api call
    copyWorkbookApiCall()
  };

  const handleClickExport = () => {
    // export api call
    setIsExportOpen(true);
  };

  return (
    <StyledWorkbookDetailBtnsBox>
      {workbook?.isOriginal && (
        <WorkbookSaveBtn onClick={handleClickSave}>
          {isLoading ? (
            <>
              <ClipLoader color="white" size={18} speedMultiplier={0.7} />
              <span>저장 중</span>
            </>
          ) : (
            <>
              <MdSave />
              <span>저장</span>
            </>
          )}
        </WorkbookSaveBtn>
      )}
      <StyledRoundGhostBtn onClick={handleClickCopy}>
        <MdOutlineFileCopy />
        <span>사본</span>
      </StyledRoundGhostBtn>

      <StyledRoundGhostBtn onClick={handleClickExport}>
        <MdOutlineFileUpload />
        <span>내보내기</span>
      </StyledRoundGhostBtn>
    </StyledWorkbookDetailBtnsBox>
  );
}

export default WorkbookDetailBtns;
