import { useRouter } from "next/router";
import { StyledTestCommonBtn } from "../common/TextCommon.style";
import { TestEndBox, TestEndBtn } from "./TextIndex.style";
import { useDispatch } from "react-redux";
import useEndStudy from "@/apis/study/useEndStudyQuery";
import useCanvasPost from "@/apis/canvas/useCanvasPost";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { CanvasPath } from "react-sketch-canvas";
import useSaveAnswer from "@/apis/study/useSaveAnswerQuery";

interface Iprops {
  allPaths: CanvasPath[];
}

export default function TestEnd({ allPaths }: Iprops) {
  const router = useRouter();
  const { mutate: endStudy } = useEndStudy();
  const { mutate: saveAnswer } = useSaveAnswer();
  const studyId = router.query.studyId;

  const goToResultHandler = () => {
    const canvasMutate = useCanvasPost().mutate;
    const { problem, curProblemNum } = useSelector((state: RootState) => state.exam);
    const { type, studentStudyProblemId, userAnswer, problemAnswer, text } =
      problem[curProblemNum - 1];

    const payload = {
      studyId: typeof studyId === "string" ? parseInt(studyId) : -1,
      studentStudyProblemId,
      userAnswer,
      type,
    };

    if (allPaths.length > 0) {
      const canvasPayload = {
        studentStudyProblemId: studentStudyProblemId,
        line: allPaths,
      };
      console.log("canvasPayload", canvasPayload);
      canvasMutate(canvasPayload);
    }

    saveAnswer(payload);
    endStudy(typeof studyId === "string" ? parseInt(studyId) : -1);
    router.push(`/test/${router.query.studyId}/result`);
  };

  return (
    <TestEndBox>
      <p>시험이 종료되었습니다.</p>
      <TestEndBtn onClick={goToResultHandler}>결과 보기</TestEndBtn>
    </TestEndBox>
  );
}
