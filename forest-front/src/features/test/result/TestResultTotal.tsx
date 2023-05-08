import TestResultTotalContent from "./TestResultTotalContent";
import { TestResultTotalBox, TestResultTotalTitleBox } from "./TextResult.style";

interface Iprops {
  studyResult: IStudyResult;
}

export default function TestResultTotal({ studyResult }: Iprops) {
  return (
    <TestResultTotalBox>
      <TestResultTotalTitleBox>시험 결과</TestResultTotalTitleBox>
      <TestResultTotalContent studyResult={studyResult} />
    </TestResultTotalBox>
  );
}
