import { useState } from "react";
import TestAnswerTable from "./TestAnswerTable";
import { StyledAnswerBox, StyledTestSubmitBtn, StyledUsername } from "./TextIndex.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useRouter } from "next/router";

export default function TestAnswerBox({
  minutes,
  seconds,
  toggleModal,
  setToggleModal,
}: IStudyModal) {
  const { username } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const openEndTestModalHandler = () => {
    setToggleModal(true);
  };

  const goToResultHandler = () => {
    router.push(`/test/${router.query.studyId}/result`);
  };

  return (
    <StyledAnswerBox>
      <StyledUsername>응시자 : {username}</StyledUsername>
      <TestAnswerTable minutes={minutes} seconds={seconds} />
      {minutes <= 0 && seconds <= 0 ? (
        <StyledTestSubmitBtn onClick={goToResultHandler}>나가기</StyledTestSubmitBtn>
      ) : (
        <StyledTestSubmitBtn onClick={openEndTestModalHandler}>종료하기</StyledTestSubmitBtn>
      )}
    </StyledAnswerBox>
  );
}
