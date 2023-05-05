import { useEffect, useState } from "react";
import TestResultTotalContentDetail from "./TestResultTotalContentDetail";
import TestResultTotalContentGraph from "./TestResultTotalContentGraph";
import { TestResultNotOpenBox, TestResultTotalContentBox } from "./TextResult.style";
import useGetStudyResult from "@/apis/study/useGetStudyResultQuery";
import { useRouter } from "next/router";

export default function TestResultTotalContent() {
  const router = useRouter();
  const studyId = router.query.studyId;
  const [studyResult, setStudyResult] = useState<IStudyResult>({
    correctNum: 0,
    correctRate: 0,
    endTime: new Date("2023-05-03T08:24:43"),
    isGraded: false,
    score: 0,
    solvingTime: 0,
    startTime: new Date("2023-05-03T06:24:30"),
    volume: 0,
  });
  useGetStudyResult({
    studyId: typeof studyId === "string" ? parseInt(studyId) : -1,
    setStudyResult,
  });

  return (
    <>
      {/* 추후 수정(희제) : 느낌표 빼야함 */}
      {!studyResult.isGraded ? (
        <TestResultTotalContentBox>
          <TestResultTotalContentDetail studyResult={studyResult} />
          <img src={"/images/Test_Result_Total_Content_Arrow.png"} className="icon" />
          <TestResultTotalContentGraph />
        </TestResultTotalContentBox>
      ) : (
        <TestResultTotalContentBox>
          <TestResultNotOpenBox>종료 시간 이후 공개됩니다.</TestResultNotOpenBox>
        </TestResultTotalContentBox>
      )}
    </>
  );
}
