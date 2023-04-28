import TestProblemAnswerNumber from "./TestProblemAnswerNumber";
import { StyledTestProblemMultipleChoiceAnswer } from "./TextIndex.style";

export default function TestProblemMultipleChoiceAnswer() {
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
        <TestProblemAnswerNumber key={`idx`} idx={idx} text={data} />
      ))}
    </StyledTestProblemMultipleChoiceAnswer>
  );
}
