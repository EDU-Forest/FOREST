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
import { useEffect } from "react";
import useCanvasPost from "@/apis/canvas/useCanvasPost";
import TestProblemImg from "./TestProblemImg";
import useCanvasRecordQuery from "@/apis/canvas/useCanvasRecordQuery";
import { clearPaths, closeCanvas, setStudentStudyProblemId } from "@/stores/exam/canvas";

interface Iprops {
  minutes: number;
  seconds: number;
  isSubmitted?: boolean;
}

export default function TestProblemBox() {
  const router = useRouter();
  const dispatch = useDispatch();
  const studyId = router.query?.studyId;
  const { mutate } = useSaveAnswer();
  const { mutate: canvasMutate } = useCanvasPost();
  const { paths, isOpenCanvas } = useSelector((state: RootState) => state.canvas);
  const { problem, curProblemNum, isSubmitted } = useSelector((state: RootState) => state.exam);
  const { type, studentStudyProblemId, userAnswer, problemAnswer, text, problemImgPath } =
    problem[curProblemNum - 1];
  // const { data: record } = useCanvasRecordQuery(studentStudyProblemId, isOpenCanvas);

  const payload = {
    studyId: typeof studyId === "string" ? parseInt(studyId) : -1,
    studentStudyProblemId,
    userAnswer,
    type,
  };

  useEffect(() => {
    dispatch(setStudentStudyProblemId(studentStudyProblemId));
  }, [studentStudyProblemId]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setChooseAnswer({ problemNum: curProblemNum, userAnswer: e.target.value }));
  };

  const goToPrevProblem = () => {
    if (curProblemNum === 1) return;
    mutate(payload);
    // if (paths.length > 0) {
    //   const canvasPayload = {
    //     studentStudyProblemId: studentStudyProblemId,
    //     line: paths,
    //   };
    //   canvasMutate(canvasPayload);
    // }
    dispatch(setCurProblemNum({ curProblemNum: curProblemNum - 1 }));
    dispatch(closeCanvas());
    dispatch(clearPaths());
  };

  const goToNextProblem = () => {
    if (curProblemNum === problem.length) return;
    mutate(payload);
    // if (paths.length > 0) {
    //   const canvasPayload = {
    //     studentStudyProblemId: studentStudyProblemId,
    //     line: paths,
    //   };
    //   canvasMutate(canvasPayload);
    // }

    dispatch(setCurProblemNum({ curProblemNum: curProblemNum + 1 }));
    dispatch(closeCanvas());
    dispatch(clearPaths());
  };

  return (
    <StyledTestProblemBox>
      <TestProblemSection>
        <TestProblemContentBox>
          <TestProblemTitle />
          {problemImgPath && <TestProblemImg problemImgPath={problemImgPath} />}
          {text && <TestProblemText />}
          {type === "MULTIPLE" && <TestProblemMultipleChoiceAnswer />}
          {type === "OX" && <TestProblemOXAnswer />}
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
