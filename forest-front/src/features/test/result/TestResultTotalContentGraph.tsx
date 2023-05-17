import CorrectRateDonut from "@/features/class/analysis/CorrectRateDonut";
import { TestResultTotalContentGraphBox } from "./TextResult.style";

interface Iprops {
  volume: number;
  correctNum: number;
  userRole?: string;
}

<<<<<<< HEAD
export default function TestResultTotalContentGraph({ volume, correctNum, userRole }: Iprops) {
  const { isGraded } = useSelector((state: RootState) => state.exam);
  return (
    <TestResultTotalContentGraphBox className={userRole === "teacher" ? "" : "blur-result"}>
=======
export default function TestResultTotalContentGraph({ volume, correctNum }: Iprops) {
  return (
    <TestResultTotalContentGraphBox>
>>>>>>> c14e70c3d552119ea0cc8b707a6dd5a769cf85ce
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
