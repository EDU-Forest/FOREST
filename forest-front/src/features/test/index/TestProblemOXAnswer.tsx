import { MdClose, MdOutlineCircle } from "react-icons/md";
import { StyledTestProblemOXAnswer } from "./TextIndex.style";
import { useState } from "react";

export default function TestProblemOXAnswer() {
  const [selectedMenu, setSelectedMenu] = useState("");

  const clickHandler = (clickedMenu: string) => {
    setSelectedMenu(clickedMenu);
  };

  return (
    <StyledTestProblemOXAnswer selectedMenu={selectedMenu}>
      <MdOutlineCircle onClick={() => clickHandler("correct")} className="correct-icon" />
      <MdClose onClick={() => clickHandler("wrong")} className="wrong-icon" />
    </StyledTestProblemOXAnswer>
  );
}
