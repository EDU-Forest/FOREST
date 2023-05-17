import CorrectRateDonut from "@/features/class/analysis/CorrectRateDonut";
import { TestResultTotalContentGraphBox } from "./TextResult.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

interface Iprops {
  volume: number;
  correctNum: number;
  userRole?: string;
}

export default function TestResultTotalContentGraph({ volume, correctNum, userRole }: Iprops) {
  const { isGraded } = useSelector((state: RootState) => state.exam);
  return (
    <TestResultTotalContentGraphBox className={userRole === "teacher" ? "" : "blur-result"}>
      <CorrectRateDonut
        answerRate={{
          correctAnswerRate: isGraded ? Math.floor((correctNum / volume) * 100) : 0,
          incorrectAnswerRate: isGraded ? Math.floor(((volume - correctNum) / volume) * 100) : 0,
          ungradedAnswerRate: 0,
        }}
        page={"studyResult"}
      />
    </TestResultTotalContentGraphBox>
  );
}
