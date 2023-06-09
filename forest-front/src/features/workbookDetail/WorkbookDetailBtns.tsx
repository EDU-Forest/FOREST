import useWorkbookCopyPostQuery from "@/apis/workbookDetail/useWorkbookDetailCopyQuery";
import useWorkbookDetailSaveQuery from "@/apis/workbookDetail/useWorkbookDetailSaveQuery";
import { StyledRoundGhostBtn } from "@/components/Button/Btn.style";
import Toast from "@/components/Toast/Toast";
import { RootState } from "@/stores/store";
import { useEffect, useState } from "react";
import { MdOutlineFileCopy, MdOutlineFileUpload, MdSave } from "react-icons/md";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { StyledWorkbookDetailBtnsBox, WorkbookSaveBtn } from "./WorkbookDetail.style";

interface IProps {
  setIsExportOpen: React.Dispatch<React.SetStateAction<boolean>>;
  questionSummary: {
    id: number;
    title: string;
  }[];
}

function WorkbookDetailBtns({ setIsExportOpen, questionSummary }: IProps) {
  const { workbook } = useSelector((state: RootState) => state.workbookDetail);
  const { questions } = useSelector((state: RootState) => state.editorQuestions);

  const { isLoading, mutate: saveWorkbookApiCall } = useWorkbookDetailSaveQuery();
  const { mutate: copyWorkbookApiCall, isSuccess } = useWorkbookCopyPostQuery(workbook?.workbookId);
  const [isCopySuccess, setIsCopySuccess] = useState(false);

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
    copyWorkbookApiCall();
  };

  const handleClickExport = () => {
    // export api call
    setIsExportOpen(true);
  };

  useEffect(() => {
    setIsCopySuccess(isSuccess);
  }, [isSuccess]);

  return (
    <>
      <StyledWorkbookDetailBtnsBox>
        {workbook?.isOriginal && !workbook?.isDeploy && (
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
        {workbook?.isOriginal && questions.length !== 0 && (
          <StyledRoundGhostBtn onClick={handleClickCopy}>
            <MdOutlineFileCopy />
            <span>사본</span>
          </StyledRoundGhostBtn>
        )}
        {questions.length !== 0 && (
          <StyledRoundGhostBtn onClick={handleClickExport}>
            <MdOutlineFileUpload />
            <span>내보내기</span>
          </StyledRoundGhostBtn>
        )}
      </StyledWorkbookDetailBtnsBox>
      {isCopySuccess && (
        <Toast
          icon={<MdOutlineFileCopy />}
          title="사본 생성 완료"
          subtitle="사본으로 이동했습니다"
          isOpen={isSuccess}
          setIsOpen={setIsCopySuccess}
        />
      )}
    </>
  );
}

export default WorkbookDetailBtns;
