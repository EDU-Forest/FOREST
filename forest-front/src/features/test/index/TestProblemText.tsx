import { useSelector } from "react-redux";
import { StyledTestProblemText } from "./TextIndex.style";
import { RootState } from "@/stores/store";

export default function TestProblemText() {
  const { problem, curProblemNum } = useSelector((state: RootState) => state.exam);
  const { text } = problem[curProblemNum - 1];

  return <StyledTestProblemText>{text}</StyledTestProblemText>;
}
