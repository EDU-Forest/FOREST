import TestResultTotalContentDetail from "./TestResultTotalContentDetail";
import TestResultTotalContentGraph from "./TestResultTotalContentGraph";
import { TestResultNotOpenBox, TestResultTotalContentBox } from "./TextResult.style";
import useGetStudyResult from "@/apis/study/useGetStudyResultQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

export default function TestResultTotalContent() {
  const { studyId, isGraded } = useSelector((state: RootState) => state.exam);
  const { data: studyResult } = useGetStudyResult(studyId);

  return (
    <>
      {studyResult ? (
        <TestResultTotalContentBox isGraded={isGraded}>
          {!studyResult.isGraded && studyResult.isSubmitted && (
            <TestResultNotOpenBox>
              <p>채점 후 공개됩니다.</p>
            </TestResultNotOpenBox>
          )}
          {!studyResult.isSubmitted && (
            <TestResultNotOpenBox>
              <p>유효하지 않은 접근입니다.</p>
            </TestResultNotOpenBox>
          )}
          <TestResultTotalContentDetail studyResult={studyResult} />
          <img src={"/images/Test_Result_Total_Content_Arrow.png"} className="icon blur-result" />
          <TestResultTotalContentGraph
            volume={studyResult.volume}
            correctNum={studyResult.correctNum}
          />
        </TestResultTotalContentBox>
      ) : (
        <TestResultTotalContentBox>
          <TestResultNotOpenBox>
            <p>유효하지 않은 접근입니다.</p>
          </TestResultNotOpenBox>
        </TestResultTotalContentBox>
      )}
    </>
  );
}
