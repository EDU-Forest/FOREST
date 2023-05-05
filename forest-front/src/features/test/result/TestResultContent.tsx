import { useSelector } from "react-redux";
import { TestResultContentBox, TestResultQuestionBtn } from "./TextResult.style";
import { RootState } from "@/stores/store";

export default function TestResultContent() {
  const { problem } = useSelector((state: RootState) => state.exam);
  return (
    <TestResultContentBox>
      {problem.map((data, idx) => (
        <TestResultQuestionBtn
          key={`question-${idx}`}
          isCorrect={data.userAnswer === data.problemAnswer}
        >
          {idx + 1}
        </TestResultQuestionBtn>
      ))}
    </TestResultContentBox>
  );
}
