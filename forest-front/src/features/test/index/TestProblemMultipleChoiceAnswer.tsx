import { useSelector } from "react-redux";
import TestProblemAnswerNumber from "./TestProblemAnswerNumber";
import { StyledTestProblemMultipleChoiceAnswer } from "./TextIndex.style";
import { RootState } from "@/stores/store";

export default function TestProblemMultipleChoiceAnswer({ minutes, seconds }: IStudyTimeLimit) {
  const { problem, curProblemNum } = useSelector((state: RootState) => state.exam);
  const { userAnswer, item } = problem[curProblemNum - 1];
  return (
    <StyledTestProblemMultipleChoiceAnswer>
      {item &&
        item.map((item, idx) => (
          // key 임시로 지정해준거 -> 바꿔야함! (희제)
          <TestProblemAnswerNumber
            isSelected={userAnswer === `${idx + 1}`}
            key={`problem-item-${idx}`}
            idx={idx}
            text={item.content}
            minutes={minutes}
            seconds={seconds}
          />
        ))}
    </StyledTestProblemMultipleChoiceAnswer>
  );
}
