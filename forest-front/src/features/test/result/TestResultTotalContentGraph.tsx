import CorrectRateDonut from "@/features/class/analysis/CorrectRateDonut";
import { TestResultTotalContentGraphBox } from "./TextResult.style";

export default function TestResultTotalContentGraph() {
  return (
    <TestResultTotalContentGraphBox>
      <CorrectRateDonut
        // 부모에서 비율 받아서 DummyData 교체하기
        answerRate={{ correctAnswerRate: 20, incorrectAnswerRate: 30, ungradedAnswerRate: 50 }}
        page={"studyResult"}
      />
    </TestResultTotalContentGraphBox>
  );
}
