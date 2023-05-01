import { useSelector } from "react-redux";
import TestProblemAnswerNumber from "./TestProblemAnswerNumber";
import { StyledTestProblemMultipleChoiceAnswer } from "./TextIndex.style";
import { RootState } from "@/stores/store";

export default function TestProblemMultipleChoiceAnswer() {
  const { problems } = useSelector((state: RootState) => state.exam);
  const { userAnswer } = problems[0];

  const dummyData = [
    "How to Deal With Noise Disturbing Units",
    "How to Deal With Noise Disturbing Units",
    "How to Deal With Noise Disturbing Units",
    "How to Deal With Noise Disturbing Units",
  ];

  return (
    <StyledTestProblemMultipleChoiceAnswer>
      {dummyData.map((data, idx) => (
        // key 임시로 지정해준거 -> 바꿔야함! (희제)
        <TestProblemAnswerNumber
          isSelected={userAnswer === idx + 1}
          key={`problem-item-${idx}`}
          idx={idx}
          text={data}
        />
      ))}
    </StyledTestProblemMultipleChoiceAnswer>
  );
}
