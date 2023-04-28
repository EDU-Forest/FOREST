import TestResultTotalContentDetailItem from "./TestResultTotalContentDetailItem";
import { TestResultTotalContentDetailBox } from "./TextResult.style";

export default function TestResultTotalContentDetail() {
  const labelList = ["백분율 환산", "정답 문항수", "풀이 시간"];
  const valueList = [80, 8, 23 * 60 + 23];

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
