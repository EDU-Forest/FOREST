import { useSelector } from "react-redux";
import TestAnswerBox from "./TestAnswerBox";
import TestProblemBox from "./TestProblemBox";
import { StyledTestContent } from "./TextIndex.style";
import { RootState } from "@/stores/store";
import { useEffect, useState } from "react";
import { CanvasPath } from "react-sketch-canvas";

interface Iprops extends IStudyModal {
  allPaths: CanvasPath[];
  setAllPaths: (allPaths: CanvasPath[]) => void;
}

export default function TestContent({
  minutes,
  seconds,
  toggleModal,
  setToggleModal,
  allPaths,
  setAllPaths,
}: Iprops) {
  return (
    <StyledTestContent>
      <TestProblemBox
        minutes={minutes}
        seconds={seconds}
        allPaths={allPaths}
        setAllPaths={setAllPaths}
      />
      <TestAnswerBox
        minutes={minutes}
        seconds={seconds}
        toggleModal={toggleModal}
        setToggleModal={setToggleModal}
      />
    </StyledTestContent>
  );
}
