import { useEffect, useState } from "react";
import TestResultTotalContentDetail from "./TestResultTotalContentDetail";
import TestResultTotalContentGraph from "./TestResultTotalContentGraph";
import { TestResultTotalContentBox } from "./TextResult.style";
import useGetStudyResult from "@/apis/study/useGetStudyResultQuery";
import { useRouter } from "next/router";

export default function TestResultTotalContent() {
  const router = useRouter();
  const studyId = router.query.studyId;
  const [studyResult, setStudyResult] = useState<IStudyResult>();
  useGetStudyResult({
    studyId: typeof studyId === "string" ? parseInt(studyId) : -1,
    setStudyResult,
  });

  return (
    <TestResultTotalContentBox>
      <TestResultTotalContentDetail studyResult={studyResult} />
      <img src={"/images/Test_Result_Total_Content_Arrow.png"} className="icon" />
      <TestResultTotalContentGraph />
    </TestResultTotalContentBox>
  );
}
