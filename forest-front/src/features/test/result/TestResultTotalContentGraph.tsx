import CorrectRateDonut from "@/features/class/analysis/CorrectRateDonut";
import { TestResultTotalContentGraphBox } from "./TextResult.style";

interface Iprops {
  volume: number;
  correctNum: number;
}

export default function TestResultTotalContentGraph({ volume, correctNum }: Iprops) {
  return (
    <TestResultTotalContentGraphBox>
      <CorrectRateDonut
        // 부모에서 비율 받아서 DummyData 교체하기
        answerRate={{
          correctAnswerRate: Math.floor((correctNum / volume) * 100),
          incorrectAnswerRate: Math.floor(((volume - correctNum) / volume) * 100),
          ungradedAnswerRate: 0,
        }}
        page={"studyResult"}
      />
    </TestResultTotalContentGraphBox>
  );
}
