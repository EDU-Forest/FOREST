import { useSelector } from "react-redux";
import TestProblemMultipleChoiceAnswer from "./TestProblemMultipleChoiceAnswer";
import TestProblemOXAnswer from "./TestProblemOXAnswer";
import TestProblemText from "./TestProblemText";
import TestProblemTitle from "./TestProblemTitle";
import {
  StyledTestProblemBox,
  StyledTestProblemEssayAnswer,
  StyledTestProblemShortAnswer,
  TestCanvas,
  TestProblemAnswerBox,
  TestProblemBtn,
  TestProblemBtnBox,
  TestProblemContentBox,
  TestProblemSection,
} from "./TextIndex.style";
import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import { setChooseAnswer, setCurProblemNum } from "@/stores/exam/exam";
import useSaveAnswer from "@/apis/study/useSaveAnswerQuery";
import { useRouter } from "next/router";
import Canvas from "@/features/canvas/Canvas";
import { useState } from "react";
import { CanvasPath } from "react-sketch-canvas";
import useCanvasPost from "@/apis/canvas/useCanvasPost";
import TestProblemImg from "./TestProblemImg";

interface Iprops {
  minutes: number;
  seconds: number;
  allPaths: CanvasPath[];
  setAllPaths: (allPaths: CanvasPath[]) => void;
}

export default function TestProblemBox({ minutes, seconds, allPaths, setAllPaths }: Iprops) {
  const router = useRouter();
  const studyId = router.query?.studyId;
  const { mutate } = useSaveAnswer();
  const canvasMutate = useCanvasPost().mutate;
  const { problem, curProblemNum, isSubmitted } = useSelector((state: RootState) => state.exam);
  const { type, studentStudyProblemId, userAnswer, problemAnswer, text, problemImgPath } =
    problem[curProblemNum - 1];
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
    const canvasPayload = {
      studentStudyProblemId: studentStudyProblemId,
      line: allPaths,
    };
    console.log("canvasPayload", canvasPayload);
    mutate(payload);
    canvasMutate(canvasPayload);

    dispatch(setCurProblemNum({ curProblemNum: curProblemNum - 1 }));
  };
  const goToNextProblem = () => {
    if (curProblemNum === problem.length) return;
    const canvasPayload = {
      studentStudyProblemId: studentStudyProblemId,
      line: allPaths,
    };
    console.log("canvasPayload", canvasPayload);
    mutate(payload);
    canvasMutate(canvasPayload);

    dispatch(setCurProblemNum({ curProblemNum: curProblemNum + 1 }));
  };

  return (
    <StyledTestProblemBox>
      <TestCanvas>
        <Canvas allPaths={allPaths} setAllPaths={setAllPaths} />
      </TestCanvas>
      <TestProblemSection>
        <TestProblemContentBox>
          <TestProblemTitle />
          {problemImgPath && <TestProblemImg problemImgPath={problemImgPath} />}
          {text && <TestProblemText />}
          {type === "MULTIPLE" && (
            <TestProblemMultipleChoiceAnswer minutes={minutes} seconds={seconds} />
          )}
          {type === "OX" && <TestProblemOXAnswer minutes={minutes} seconds={seconds} />}
          {type === "SUBJECTIVE" && (
            <StyledTestProblemShortAnswer
              disabled={isSubmitted}
              value={userAnswer ? userAnswer : ""}
              onChange={onChange}
              placeholder="정답을 입력하세요"
            />
          )}
          {type === "DESCRIPT" && (
            <StyledTestProblemEssayAnswer
              disabled={isSubmitted}
              value={userAnswer ? userAnswer : ""}
              onChange={onChange}
              placeholder="정답을 입력하세요"
            />
          )}
          {isSubmitted && (
            <TestProblemAnswerBox>
              {type === "DESCRIPT" ? <div>핵심 단어</div> : <div>정답</div>}
              <div>{problemAnswer}</div>
            </TestProblemAnswerBox>
          )}
        </TestProblemContentBox>
      </TestProblemSection>
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
