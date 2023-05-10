import { IStudyResult } from "@/types/Study";
import TestResultTotalContent from "./TestResultTotalContent";
import { TestResultTotalBox, TestResultTotalTitleBox } from "./TextResult.style";

interface Iprops {
  studyResult: IStudyResult;
}

export default function TestResultTotal() {
  return (
    <TestResultTotalBox>
      <TestResultTotalTitleBox>시험 결과</TestResultTotalTitleBox>
      <TestResultTotalContent />
    </TestResultTotalBox>
  );
}
