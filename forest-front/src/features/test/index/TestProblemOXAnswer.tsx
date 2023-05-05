import { MdClose, MdOutlineCircle } from "react-icons/md";
import { StyledTestProblemOXAnswer } from "./TextIndex.style";
import { useState } from "react";
import { setChooseAnswer } from "@/stores/exam/exam";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

export default function TestProblemOXAnswer({ minutes, seconds }: IStudyTimeLimit) {
  // const [selectedMenu, setSelectedMenu] = useState("");
  const { problem, curProblemNum } = useSelector((state: RootState) => state.exam);
  const { userAnswer, problemNum } = problem[curProblemNum - 1];
  const dispatch = useDispatch();
  const clickHandler = (OX: string) => {
    // setSelectedMenu(clickedMenu);
    if (minutes <= 0 && seconds <= 0) return;
    dispatch(setChooseAnswer({ problemNum: curProblemNum, userAnswer: OX }));
  };

  return (
    <StyledTestProblemOXAnswer selectedMenu={userAnswer}>
      <MdOutlineCircle onClick={() => clickHandler("O")} className="correct-icon" />
      <MdClose onClick={() => clickHandler("X")} className="wrong-icon" />
    </StyledTestProblemOXAnswer>
  );
}
