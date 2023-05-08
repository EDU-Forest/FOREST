import { useState } from "react";
import TestAnswerTable from "./TestAnswerTable";
import { StyledAnswerBox, StyledTestSubmitBtn, StyledUsername } from "./TextIndex.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useRouter } from "next/router";
import useCanvasPost from "@/apis/canvas/useCanvasPost";
import { CanvasPath } from "react-sketch-canvas";

interface Iprops extends IStudyModal {
  allPaths: CanvasPath[];
  isSubmitted?: boolean;
}

export default function TestAnswerBox({
  minutes,
  seconds,
  toggleModal,
  setToggleModal,
  allPaths,
  isSubmitted,
}: Iprops) {
  const { username } = useSelector((state: RootState) => state.user);
  const { problem, curProblemNum } = useSelector((state: RootState) => state.exam);
  const { studentStudyProblemId } = problem[curProblemNum - 1];
  const router = useRouter();
  const canvasMutate = useCanvasPost().mutate;
  const openEndTestModalHandler = () => {
    setToggleModal(true);
  };

  const goToResultHandler = () => {
    const canvasPayload = {
      studentStudyProblemId: studentStudyProblemId,
      line: allPaths,
    };
    console.log("canvasPayload", canvasPayload);
    canvasMutate(canvasPayload);

    router.push(`/test/${router.query.studyId}/result`);
  };

  return (
    <StyledAnswerBox>
      <StyledUsername>응시자 : {username}</StyledUsername>
      <TestAnswerTable minutes={minutes} seconds={seconds} />
      {isSubmitted ? (
        <StyledTestSubmitBtn onClick={goToResultHandler}>나가기</StyledTestSubmitBtn>
      ) : (
        <StyledTestSubmitBtn onClick={openEndTestModalHandler}>종료하기</StyledTestSubmitBtn>
      )}
    </StyledAnswerBox>
  );
}
