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
import useSaveAnswer from "@/apis/study/useSaveAnswerQuery";
import { useRouter } from "next/router";

export default function TestProblemBox() {
  const router = useRouter();
  const studyId = router.query?.studyId;
  const { mutate } = useSaveAnswer();
  const { problem, curProblemNum } = useSelector((state: RootState) => state.exam);
  const { type, studentStudyProblemId, userAnswer } = problem[curProblemNum - 1];
  const dispatch = useDispatch();

  const payload = {
    studyId: typeof studyId === "string" ? parseInt(studyId) : -1,
    studentStudyProblemId,
    userAnswer,
    type,
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setChooseAnswer({ problemNum: curProblemNum, userAnswer: e.target.value }));
  };

  const goToPrevProblem = () => {
    if (curProblemNum === 1) return;

    mutate(payload);
    dispatch(setCurProblemNum({ curProblemNum: curProblemNum - 1 }));
  };
  const goToNextProblem = () => {
    mutate(payload);
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
        <StyledTestProblemShortAnswer
          value={userAnswer}
          onChange={onChange}
          placeholder="정답을 입력하세요"
        />
      )}
      {type === "DESCRIPT" && (
        <StyledTestProblemEssayAnswer
          value={userAnswer}
          onChange={onChange}
          placeholder="정답을 입력하세요"
        />
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
