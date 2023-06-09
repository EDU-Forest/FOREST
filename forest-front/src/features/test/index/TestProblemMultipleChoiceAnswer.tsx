import { useSelector } from "react-redux";
import TestProblemAnswerNumber from "./TestProblemAnswerNumber";
import { StyledTestProblemMultipleChoiceAnswer } from "./TextIndex.style";
import { RootState } from "@/stores/store";

export default function TestProblemMultipleChoiceAnswer() {
  const { problem, curProblemNum } = useSelector((state: RootState) => state.exam);
  const { userAnswer, item } = problem[curProblemNum - 1];
  return (
    <StyledTestProblemMultipleChoiceAnswer>
      {item?.map((item, idx) => (
        <TestProblemAnswerNumber
          isSelected={userAnswer === `${idx + 1}`}
          key={`problem-item-${idx}`}
          idx={idx}
          text={item.content}
          isImage={item.isImage}
        />
      ))}
    </StyledTestProblemMultipleChoiceAnswer>
  );
}
