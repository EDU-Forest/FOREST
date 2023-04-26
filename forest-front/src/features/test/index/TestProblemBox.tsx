import TestProblemAnswer from "./TestProblemAnswer";
import TestProblemText from "./TestProblemText";
import TestProblemTitle from "./TestProblemTitle";
import { StyledTestProblemBox } from "./index.style";

export default function TestProblemBox() {
  return (
    <StyledTestProblemBox>
      <TestProblemTitle />
      <TestProblemText />
      <TestProblemAnswer />
    </StyledTestProblemBox>
  );
}
