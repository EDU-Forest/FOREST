import { useRouter } from "next/router";
import { StyledTestCommonBtn } from "../common/TextCommon.style";
import { TestEndBox, TestEndBtn } from "./TextIndex.style";
import { useDispatch } from "react-redux";
import useEndStudy from "@/apis/study/useEndStudyQuery";
import useCanvasPost from "@/apis/canvas/useCanvasPost";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useSaveAnswer from "@/apis/study/useSaveAnswerQuery";
import { useEffect } from "react";

export default function TestEnd() {
  const router = useRouter();
  const { mutate: endStudy, isSuccess: endSuccess } = useEndStudy();
  const { mutate: saveAnswer, isSuccess: saveSuccess } = useSaveAnswer();
  const { mutate: canvasMutate } = useCanvasPost();
  const studyId = router.query.studyId;

  const { paths } = useSelector((state: RootState) => state.canvas);
  const { problem, curProblemNum } = useSelector((state: RootState) => state.exam);

  const goToResultHandler = () => {
    const { type, studentStudyProblemId, userAnswer, problemAnswer, text } =
      problem[curProblemNum - 1];

    const payload = {
      studyId: typeof studyId === "string" ? parseInt(studyId) : -1,
      studentStudyProblemId,
      userAnswer,
      type,
    };

    if (paths?.length > 0) {
      const canvasPayload = {
        studentStudyProblemId: studentStudyProblemId,
        line: paths,
      };
      canvasMutate(canvasPayload);
    }

    saveAnswer(payload);
  };

  useEffect(() => {
    if (saveSuccess) {
      endStudy(typeof studyId === "string" ? parseInt(studyId) : -1);
    }
  }, [saveSuccess]);

  useEffect(() => {
    if (endSuccess) {
      router.push(`/test/${router.query.studyId}/result`);
    }
  }, [endSuccess]);

  return (
    <TestEndBox>
      <p>시험이 종료되었습니다.</p>
      <TestEndBtn onClick={goToResultHandler}>결과 보기</TestEndBtn>
    </TestEndBox>
  );
}
