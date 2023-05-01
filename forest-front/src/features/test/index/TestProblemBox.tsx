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
import { useRouter } from "next/router";
import { setSessionStorage } from "@/utils/sessionStorage";
import { getSessionStorage } from "@/utils/sessionStorage";
import { useDispatch } from "react-redux";
import { setCurProblemNum } from "@/stores/exam/exam";
import CommonBtn from "@/components/Button/CommonBtn";

export default function TestProblemBox() {
  const router = useRouter();
  const { problems, curProblemNum } = useSelector((state: RootState) => state.exam);
  const { type } = problems[curProblemNum - 1];
  const dispatch = useDispatch();

  const goToPrevProblem = () => {
    if (curProblemNum === 1) return;
    dispatch(setCurProblemNum({ curProblemNum: curProblemNum - 1 }));
  };
  const goToNextProblem = () => {
    if (curProblemNum === problems.length) return;
    dispatch(setCurProblemNum({ curProblemNum: curProblemNum + 1 }));
  };

  return (
    <StyledTestProblemBox>
      <TestProblemTitle />
      <TestProblemText />
      {type === "MULTIPLE" && <TestProblemMultipleChoiceAnswer />}
      {type === "OX" && <TestProblemOXAnswer />}
      {type === "SUBJECTIVE" && <StyledTestProblemShortAnswer placeholder="정답을 입력하세요" />}
      {type === "DESCRIPT" && <StyledTestProblemEssayAnswer placeholder="정답을 입력하세요" />}
      <TestProblemBtnBox>
        <TestProblemBtn onClick={goToPrevProblem} disabled={curProblemNum === 1 ? true : false}>
          이전
        </TestProblemBtn>
        <TestProblemBtn
          onClick={goToNextProblem}
          colored={true}
          disabled={curProblemNum === problems.length ? true : false}
        >
          다음
        </TestProblemBtn>
      </TestProblemBtnBox>
    </StyledTestProblemBox>
  );
}
