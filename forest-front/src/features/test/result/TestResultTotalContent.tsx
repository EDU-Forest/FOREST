import TestResultTotalContentDetail from "./TestResultTotalContentDetail";
import TestResultTotalContentGraph from "./TestResultTotalContentGraph";
import { TestResultTotalContentBox } from "./TextResult.style";

export default function TestResultTotalContent() {
  return (
    <TestResultTotalContentBox>
      <TestResultTotalContentDetail />
      <img src={"/images/Test_Result_Total_Content_Arrow.png"} className="icon" />
      <TestResultTotalContentGraph />
    </TestResultTotalContentBox>
  );
}
