import { useSelector } from "react-redux";
import { StyledTestProblemTitleLabel } from "./TextIndex.style";
import { RootState } from "@/stores/store";

export default function TestProblemTitleLabel() {
  const { problems } = useSelector((state: RootState) => state.exam);
  const { problemNum } = problems[0];
  return <StyledTestProblemTitleLabel>{problemNum}</StyledTestProblemTitleLabel>;
}
