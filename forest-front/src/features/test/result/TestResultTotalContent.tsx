import { useEffect, useState } from "react";
import TestResultTotalContentDetail from "./TestResultTotalContentDetail";
import TestResultTotalContentGraph from "./TestResultTotalContentGraph";
import { TestResultNotOpenBox, TestResultTotalContentBox } from "./TextResult.style";
import useGetStudyResult from "@/apis/study/useGetStudyResultQuery";
import { useRouter } from "next/router";

interface Iprops {
  studyResult: IStudyResult;
}

export default function TestResultTotalContent({ studyResult }: Iprops) {
  return (
    <>
      {studyResult.isGraded && studyResult.isSubmitted ? (
        <TestResultTotalContentBox>
          <TestResultTotalContentDetail studyResult={studyResult} />
          <img src={"/images/Test_Result_Total_Content_Arrow.png"} className="icon" />
          <TestResultTotalContentGraph
            volume={studyResult.volume}
            correctNum={studyResult.correctNum}
          />
        </TestResultTotalContentBox>
      ) : (
        <TestResultTotalContentBox>
          <TestResultNotOpenBox>종료 시간 이후 공개됩니다.</TestResultNotOpenBox>
        </TestResultTotalContentBox>
      )}
    </>
  );
}
