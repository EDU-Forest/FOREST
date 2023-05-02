import { useState } from "react";
import TestAnswerTable from "./TestAnswerTable";
import { StyledAnswerBox, StyledTestSubmitBtn, StyledUsername } from "./TextIndex.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

export default function TestAnswerBox() {
  const [toggleModal, setToggleModal] = useState(false);
  const { username } = useSelector((state: RootState) => state.user);

  const clickHandler = () => {
    setToggleModal(true);
  };

  return (
    <StyledAnswerBox>
      <StyledUsername>응시자 : {username}</StyledUsername>
      <TestAnswerTable />
      <StyledTestSubmitBtn onClick={clickHandler}>종료하기</StyledTestSubmitBtn>
    </StyledAnswerBox>
  );
}
