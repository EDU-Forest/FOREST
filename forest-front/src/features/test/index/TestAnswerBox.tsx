import { useState } from "react";
import TestAnswerTable from "./TestAnswerTable";
import { StyledAnswerBox, StyledTestSubmitBtn, StyledUsername } from "./TextIndex.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useRouter } from "next/router";
import useCanvasPost from "@/apis/canvas/useCanvasPost";
import { IStudyModal } from "@/types/Study";
import { useDispatch } from "react-redux";
import { setToggleModal } from "@/stores/exam/exam";

// interface Iprops extends IStudyModal {
//   isSubmitted?: boolean;
// }

export default function TestAnswerBox() {
  const dispatch = useDispatch();
  const { username } = useSelector((state: RootState) => state.user);
  const { problem, curProblemNum, isSubmitted } = useSelector((state: RootState) => state.exam);
  // const { paths } = useSelector((state: RootState) => state.canvas);
  const { studentStudyProblemId } = problem[curProblemNum - 1];
  const router = useRouter();
  // const canvasMutate = useCanvasPost().mutate;
  const openEndTestModalHandler = () => {
    dispatch(setToggleModal(true));
  };

  const goToResultHandler = () => {
    // if (paths.length > 0) {
    //   const canvasPayload = {
    //     studentStudyProblemId: studentStudyProblemId,
    //     line: paths,
    //   };
    //   canvasMutate(canvasPayload);
    // }

    router.push(`/test/${router.query.studyId}/result`);
  };

  return (
    <StyledAnswerBox>
      <StyledUsername>응시자 : {username}</StyledUsername>
      <TestAnswerTable />
      {isSubmitted ? (
        <StyledTestSubmitBtn onClick={goToResultHandler}>나가기</StyledTestSubmitBtn>
      ) : (
        <StyledTestSubmitBtn onClick={openEndTestModalHandler}>종료하기</StyledTestSubmitBtn>
      )}
    </StyledAnswerBox>
  );
}
