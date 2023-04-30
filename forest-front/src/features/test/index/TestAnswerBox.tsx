import { useState } from "react";
import TestAnswerTable from "./TestAnswerTable";
import { StyledAnswerBox, StyledTestSubmitBtn, StyledUsername } from "./TextIndex.style";

export default function TestAnswerBox() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const clickHandler = () => {
    // setIsOpenModal(true);
  };

  return (
    <StyledAnswerBox>
      <StyledUsername>응시자 : {"양희제"}</StyledUsername>
      <TestAnswerTable />
      <StyledTestSubmitBtn onClick={clickHandler}>종료하기</StyledTestSubmitBtn>
    </StyledAnswerBox>
  );
}
