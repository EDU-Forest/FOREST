import TestResultTotalContentDetail from "./TestResultTotalContentDetail";
import TestResultTotalContentGraph from "./TestResultTotalContentGraph";
import { TestResultNotOpenBox, TestResultTotalContentBox } from "./TextResult.style";
import useGetStudyResult from "@/apis/study/useGetStudyResultQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

export default function TestResultTotalContent() {
  const { studyId } = useSelector((state: RootState) => state.exam);
  const { data: studyResult } = useGetStudyResult(studyId);

  return (
    <>
      {!studyResult?.isGraded && studyResult?.isSubmitted ? (
        <TestResultTotalContentBox>
          <TestResultNotOpenBox>채점 후 공개됩니다.</TestResultNotOpenBox>
        </TestResultTotalContentBox>
      ) : !studyResult?.isSubmitted ? (
        <TestResultTotalContentBox>
          <TestResultNotOpenBox>유효하지 않은 접근입니다.</TestResultNotOpenBox>
        </TestResultTotalContentBox>
      ) : (
        <TestResultTotalContentBox>
          <TestResultTotalContentDetail studyResult={studyResult} />
          <img src={"/images/Test_Result_Total_Content_Arrow.png"} className="icon" />
          <TestResultTotalContentGraph
            volume={studyResult.volume}
            correctNum={studyResult.correctNum}
          />
        </TestResultTotalContentBox>
      )}
    </>
  );
}
