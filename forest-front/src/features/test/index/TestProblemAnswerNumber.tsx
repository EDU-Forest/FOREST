import { useSelector } from "react-redux";
import {
  StyledTestNumberBtn,
  StyledTestNumberText,
  StyledTestProblemAnswerNumber,
} from "./TextIndex.style";
import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import { setChooseAnswer } from "@/stores/exam/exam";
import { IStudyTimeLimit } from "@/types/Study";

interface Iprops extends IStudyTimeLimit {
  idx: number;
  text: string;
  isSelected: boolean;
  isImage: boolean;
}

export default function TestProblemAnswerNumber({
  isSelected,
  idx,
  text,
  minutes,
  seconds,
  isImage,
}: Iprops) {
  const dispatch = useDispatch();
  const { curProblemNum } = useSelector((state: RootState) => state.exam);
  const chooseAnswer = () => {
    if (minutes <= 0 && seconds <= 0) return;
    dispatch(setChooseAnswer({ problemNum: curProblemNum, userAnswer: `${idx + 1}` }));
  };

  return (
    <StyledTestProblemAnswerNumber>
      <StyledTestNumberBtn onClick={chooseAnswer} isSelected={isSelected}>
        {idx + 1}
      </StyledTestNumberBtn>
      {isImage ? (
        <img src={text} onClick={chooseAnswer} />
      ) : (
        <StyledTestNumberText onClick={chooseAnswer}>{text}</StyledTestNumberText>
      )}
    </StyledTestProblemAnswerNumber>
  );
}
