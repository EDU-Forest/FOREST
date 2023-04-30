import { TestResultContentBox, TestResultQuestionBtn } from "./TextResult.style";

export default function TestResultContent() {
  const dummyData = [true, false, true, true, true, true, true, true, false, true];

  return (
    <TestResultContentBox>
      {dummyData.map((data, idx) => (
        <TestResultQuestionBtn key={`question-${idx}`} isCorrect={data}>
          {idx + 1}
        </TestResultQuestionBtn>
      ))}
    </TestResultContentBox>
  );
}
