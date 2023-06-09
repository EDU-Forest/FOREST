import { useSelector } from "react-redux";
import { TestEndModalBox, TestWarningBox } from "./TextIndex.style";
import { AiOutlineWarning } from "react-icons/ai";
import { IoMdClose, IoMdCheckmark } from "react-icons/io";
import { RootState } from "@/stores/store";
import { TestBtnBox } from "../result/TextResult.style";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useEndStudy from "@/apis/study/useEndStudyQuery";
import useSaveAnswer from "@/apis/study/useSaveAnswerQuery";
import useCanvasPost from "@/apis/canvas/useCanvasPost";
import { useDispatch } from "react-redux";
import { setToggleModal } from "@/stores/exam/exam";

export default function TestEndModal() {
  const router = useRouter();
  const dispatch = useDispatch();
  const studyId = router.query.studyId;

  const { mutate: endStudy, isSuccess: endSuccess } = useEndStudy();
  const { mutate: saveAnswer, isSuccess: saveSuccess } = useSaveAnswer();

  const { paths } = useSelector((state: RootState) => state.canvas);
  const { problem, curProblemNum } = useSelector((state: RootState) => state.exam);
  const { studentStudyProblemId, userAnswer, type } = problem[curProblemNum - 1];
  const [remainProblem, setRemainProblem] = useState(0);
  const canvasMutate = useCanvasPost().mutate;

  useEffect(() => {
    setRemainProblem(
      problem.reduce((acc, val) => {
        return val.userAnswer ? acc : acc + 1;
      }, 0),
    );
  }, []);

  const cancelHandler = () => {
    dispatch(setToggleModal(false));
  };

  const okHandler = () => {
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

    setToggleModal(false);
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
    <TestEndModalBox>
      <p>시험을 종료하시겠습니까?</p>
      {remainProblem !== 0 && (
        <TestWarningBox>
          <AiOutlineWarning />
          <p>{remainProblem} 개의 풀지 못한 문제가 있습니다.</p>{" "}
        </TestWarningBox>
      )}
      <TestBtnBox>
        <IoMdClose onClick={cancelHandler} className="cancel" />
        <IoMdCheckmark onClick={okHandler} className="ok" />
      </TestBtnBox>
    </TestEndModalBox>
  );
}
