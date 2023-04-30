import { useSelector } from "react-redux";
import TestProblemMultipleChoiceAnswer from "./TestProblemMultipleChoiceAnswer";
import TestProblemOXAnswer from "./TestProblemOXAnswer";
import TestProblemText from "./TestProblemText";
import TestProblemTitle from "./TestProblemTitle";
import {
  StyledTestProblemBox,
  StyledTestProblemEssayAnswer,
  StyledTestProblemShortAnswer,
} from "./TextIndex.style";
import { RootState } from "@/stores/store";

export default function TestProblemBox() {
  const { problems } = useSelector((state: RootState) => state.exam);
  const { type } = problems[0];

  return (
    <StyledTestProblemBox>
      <TestProblemTitle />
      <TestProblemText />
      {type === "MULTIPLE" && <TestProblemMultipleChoiceAnswer />}
      {type === "OX" && <TestProblemOXAnswer />}
      {type === "SUBJECTIVE" && <StyledTestProblemShortAnswer placeholder="정답을 입력하세요" />}
      {type === "DESCRIPT" && <StyledTestProblemEssayAnswer placeholder="정답을 입력하세요" />}
    </StyledTestProblemBox>
  );
}
