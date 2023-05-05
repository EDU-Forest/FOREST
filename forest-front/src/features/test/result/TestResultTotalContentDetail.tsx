import TestResultTotalContentDetailItem from "./TestResultTotalContentDetailItem";
import { TestResultTotalContentDetailBox } from "./TextResult.style";

interface Iprops {
  studyResult: IStudyResult;
}

// any 수정
export default function TestResultTotalContentDetail({ studyResult }: Iprops) {
  const labelList = ["백분율 환산", "정답 문항수", "풀이 시간"];
  const valueList = [studyResult.correctRate, studyResult.correctNum, studyResult.solvingTime];

  return (
    <TestResultTotalContentDetailBox>
      {labelList.map((_, idx) => (
        <TestResultTotalContentDetailItem
          key={`result-list-${idx}`}
          idx={idx}
          value={valueList[idx]}
        />
      ))}
    </TestResultTotalContentDetailBox>
  );
}
