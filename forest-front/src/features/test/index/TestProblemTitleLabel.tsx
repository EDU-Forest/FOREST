import { useSelector } from "react-redux";
import { StyledTestProblemTitleLabel } from "./TextIndex.style";
import { RootState } from "@/stores/store";

export default function TestProblemTitleLabel() {
  const { problem, curProblemNum } = useSelector((state: RootState) => state.exam);
  const { problemNum } = problem[curProblemNum - 1];
  return <StyledTestProblemTitleLabel>{problemNum}</StyledTestProblemTitleLabel>;
}
