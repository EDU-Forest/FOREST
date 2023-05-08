import { useRouter } from "next/router";
import TestResultQuestion from "./TestResultQuestion";
import TestResultTotal from "./TestResultTotal";
import { TestResultOkBtn, TestResultSectionBox } from "./TextResult.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useState } from "react";
import useGetStudyResult from "@/apis/study/useGetStudyResultQuery";

export default function TestResultSection() {
  const router = useRouter();
  const { role } = useSelector((state: RootState) => state.user);
  const studyId = router.query.studyId;
  const [studyResult, setStudyResult] = useState<IStudyResult>({
    correctNum: 0,
    correctRate: 0,
    endTime: new Date("2023-05-03T08:24:43"),
    isGraded: false,
    isSubmitted: false,
    score: 0,
    solvingTime: 0,
    startTime: new Date("2023-05-03T06:24:30"),
    volume: 0,
  });
  useGetStudyResult({
    studyId: typeof studyId === "string" ? parseInt(studyId) : -1,
    setStudyResult,
  });

  const clickHandler = () => {
    router.push(`/${role.toLowerCase()}/dashboard`);
  };

  return (
    <TestResultSectionBox>
      <TestResultTotal studyResult={studyResult} />
      <TestResultQuestion studyResult={studyResult} />
      <TestResultOkBtn onClick={clickHandler}>확인</TestResultOkBtn>
    </TestResultSectionBox>
  );
}
