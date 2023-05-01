import { useSelector } from "react-redux";
import {
  StyledTestNumberBtn,
  StyledTestNumberText,
  StyledTestProblemAnswerNumber,
} from "./TextIndex.style";
import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import { setChooseAnswer } from "@/stores/exam/exam";

interface Iprops {
  idx: number;
  text: string;
  isSelected: boolean;
}

export default function TestProblemAnswerNumber({ isSelected, idx, text }: Iprops) {
  const dispatch = useDispatch();
  const { problems, curProblemNum } = useSelector((state: RootState) => state.exam);
  const { problemNum } = problems[curProblemNum - 1];
  const chooseAnswer = () => {
    dispatch(setChooseAnswer({ problemNum: problemNum, userAnswer: idx + 1 }));
  };

  return (
    <StyledTestProblemAnswerNumber>
      <StyledTestNumberBtn onClick={chooseAnswer} isSelected={isSelected}>
        {idx + 1}
      </StyledTestNumberBtn>
      <StyledTestNumberText onClick={chooseAnswer}>{text}</StyledTestNumberText>
    </StyledTestProblemAnswerNumber>
  );
}
