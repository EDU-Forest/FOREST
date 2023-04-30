import { useSelector } from "react-redux";
import { StyledTestProblemText } from "./TextIndex.style";
import { RootState } from "@/stores/store";

export default function TestProblemText() {
  const { problems } = useSelector((state: RootState) => state.exam);
  const { text } = problems[0];

  return <StyledTestProblemText>{text}</StyledTestProblemText>;
}
