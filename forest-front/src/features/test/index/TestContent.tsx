import TestAnswerBox from "./TestAnswerBox";
import TestProblemBox from "./TestProblemBox";
import { StyledTestContent } from "./TextIndex.style";

export default function TestContent() {
  return (
    <StyledTestContent>
      <TestProblemBox />
      <TestAnswerBox />
    </StyledTestContent>
  );
}
