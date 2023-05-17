import { IStudyResult } from "@/types/Study";
import TestResultTotalContentDetailItem from "./TestResultTotalContentDetailItem";
import { TestResultTotalContentDetailBox } from "./TextResult.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

interface Iprops {
  studyResult: IStudyResult;
}

// any 수정
export default function TestResultTotalContentDetail({ studyResult }: Iprops) {
  const { isGraded } = useSelector((state: RootState) => state.exam);
  const labelList = ["백분율 환산", "정답 문항수", "풀이 시간"];
  const valueList = isGraded
    ? [studyResult.correctRate, studyResult.correctNum, studyResult.solvingTime]
    : [0, 0, 0];

  return (
    <TestResultTotalContentDetailBox className="blur-result">
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
