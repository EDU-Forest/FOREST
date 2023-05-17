import TestAnswerTable from "./TestAnswerTable";
import { StyledAnswerBox, StyledTestSubmitBtn, StyledUsername } from "./TextIndex.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setToggleModal } from "@/stores/exam/exam";
import { closeCanvas } from "@/stores/exam/canvas";

export default function TestAnswerBox() {
  const dispatch = useDispatch();
  const { username } = useSelector((state: RootState) => state.user);
  const { problem, curProblemNum, isSubmitted } = useSelector((state: RootState) => state.exam);

  const router = useRouter();

  const openEndTestModalHandler = () => {
    dispatch(setToggleModal(true));
  };

  const goToResultHandler = () => {
    dispatch(closeCanvas());

    router.push(`/test/${router.query.studyId}/result`, undefined, { shallow: true });
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
