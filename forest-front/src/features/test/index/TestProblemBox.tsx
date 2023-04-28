import TestProblemMultipleChoiceAnswer from "./TestProblemMultipleChoiceAnswer";
import TestProblemOXAnswer from "./TestProblemOXAnswer";
import TestProblemText from "./TestProblemText";
import TestProblemTitle from "./TestProblemTitle";
import {
  StyledTestProblemBox,
  StyledTestProblemEssayAnswer,
  StyledTestProblemShortAnswer,
} from "./TextIndex.style";

export default function TestProblemBox() {
  return (
    <StyledTestProblemBox>
      <TestProblemTitle />
      <TestProblemText />
      <TestProblemMultipleChoiceAnswer />
      <TestProblemOXAnswer />
      <StyledTestProblemShortAnswer placeholder="정답을 입력하세요" />
      <StyledTestProblemEssayAnswer placeholder="정답을 입력하세요" />
    </StyledTestProblemBox>
  );
}
