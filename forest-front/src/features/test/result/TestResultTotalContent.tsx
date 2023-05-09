import TestResultTotalContentDetail from "./TestResultTotalContentDetail";
import TestResultTotalContentGraph from "./TestResultTotalContentGraph";
import { TestResultNotOpenBox, TestResultTotalContentBox } from "./TextResult.style";
import useGetStudyResult from "@/apis/study/useGetStudyResultQuery";
import { useRouter } from "next/router";
import { IStudyResult } from "@/types/Study";

interface Iprops {
  studyResult: IStudyResult;
}

export default function TestResultTotalContent({ studyResult }: Iprops) {
  return (
    <>
      {studyResult.isSubmitted ? (
        <TestResultTotalContentBox>
          <TestResultNotOpenBox>채점 후 공개됩니다.</TestResultNotOpenBox>
        </TestResultTotalContentBox>
      ) : !studyResult.isSubmitted ? (
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
