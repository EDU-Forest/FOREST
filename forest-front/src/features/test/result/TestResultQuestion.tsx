import TestResultContent from "./TestResultContent";
import { TestResultQuestionBox, TestResultTitleBox } from "./TextResult.style";

export default function TestResultQuestion() {
  return (
    <TestResultQuestionBox>
      <TestResultTitleBox>문항별 정답 여부</TestResultTitleBox>
      <TestResultContent />
    </TestResultQuestionBox>
  );
}
