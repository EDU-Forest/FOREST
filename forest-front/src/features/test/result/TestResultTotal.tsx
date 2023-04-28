import TestResultTotalContent from "./TestResultTotalContent";
import { TestResultTotalBox, TestResultTotalTitleBox } from "./TextResult.style";

export default function TestResultTotal() {
  return (
    <TestResultTotalBox>
      <TestResultTotalTitleBox>시험 결과</TestResultTotalTitleBox>
      <TestResultTotalContent />
    </TestResultTotalBox>
  );
}
