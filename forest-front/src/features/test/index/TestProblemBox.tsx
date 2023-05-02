import { useSelector } from "react-redux";
import TestProblemMultipleChoiceAnswer from "./TestProblemMultipleChoiceAnswer";
import TestProblemOXAnswer from "./TestProblemOXAnswer";
import TestProblemText from "./TestProblemText";
import TestProblemTitle from "./TestProblemTitle";
import {
  StyledTestProblemBox,
  StyledTestProblemEssayAnswer,
  StyledTestProblemShortAnswer,
  TestProblemBtn,
  TestProblemBtnBox,
} from "./TextIndex.style";
import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import { setChooseAnswer, setCurProblemNum } from "@/stores/exam/exam";

export default function TestProblemBox() {
  const { problem, curProblemNum } = useSelector((state: RootState) => state.exam);
  const { type, userAnswer } = problem[curProblemNum - 1];
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setChooseAnswer({ problemNum: curProblemNum, userAnswer: e.target.value }));
  };

  const goToPrevProblem = () => {
    if (curProblemNum === 1) return;
    dispatch(setCurProblemNum({ curProblemNum: curProblemNum - 1 }));
  };
  const goToNextProblem = () => {
    if (curProblemNum === problem.length) return;
    dispatch(setCurProblemNum({ curProblemNum: curProblemNum + 1 }));
  };

  return (
    <StyledTestProblemBox>
      <TestProblemTitle />
      <TestProblemText />
      {type === "MULTIPLE" && <TestProblemMultipleChoiceAnswer />}
      {type === "OX" && <TestProblemOXAnswer />}
      {type === "SUBJECTIVE" && (
        <StyledTestProblemShortAnswer onChange={onChange} placeholder="정답을 입력하세요" />
      )}
      {type === "DESCRIPT" && (
        <StyledTestProblemEssayAnswer onChange={onChange} placeholder="정답을 입력하세요" />
      )}
      <TestProblemBtnBox>
        <TestProblemBtn onClick={goToPrevProblem} disabled={curProblemNum === 1 ? true : false}>
          이전
        </TestProblemBtn>
        <TestProblemBtn
          onClick={goToNextProblem}
          colored={true}
          disabled={curProblemNum === problem.length ? true : false}
        >
          다음
        </TestProblemBtn>
      </TestProblemBtnBox>
    </StyledTestProblemBox>
  );
}
