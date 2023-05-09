import { IStudyResult } from "@/types/Study";
import TestResultContent from "./TestResultContent";
import { TestResultQuestionBox, TestResultTitleBox } from "./TextResult.style";

interface Iprops {
  studyResult: IStudyResult;
}

export default function TestResultQuestion({ studyResult }: Iprops) {
  return (
    <TestResultQuestionBox>
      <TestResultTitleBox>문항별 정답 여부</TestResultTitleBox>
      <TestResultContent studyResult={studyResult} />
    </TestResultQuestionBox>
  );
}
