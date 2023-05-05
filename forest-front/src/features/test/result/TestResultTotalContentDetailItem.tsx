import {
  TestResultLabelText,
  TestResultTotalContentDetailItemBox,
  TestResultTotalContentDetailLeftItemBox,
  TestResultTotalContentDetailRightItemBox,
} from "./TextResult.style";

interface Iprops {
  idx: number;
  value: number;
}

export default function TestResultTotalContentDetailItem({ idx, value }: Iprops) {
  const labelList = ["백분율 환산", "정답 문항수", "풀이 시간"];
  const unitList = ["%", "문항", "분"];
  return (
    <TestResultTotalContentDetailItemBox>
      <TestResultTotalContentDetailLeftItemBox>
        <img src={`/images/Test_Result_Category_${idx}.png`} className="logo" />
        <TestResultLabelText>{labelList[idx]}</TestResultLabelText>
      </TestResultTotalContentDetailLeftItemBox>
      <TestResultTotalContentDetailRightItemBox>
        <p>{value}</p> <p>{unitList[idx]}</p>
      </TestResultTotalContentDetailRightItemBox>
    </TestResultTotalContentDetailItemBox>
  );
}
