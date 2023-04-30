import { useSelector } from "react-redux";
import TestAnswerBox from "./TestAnswerBox";
import TestProblemBox from "./TestProblemBox";
import { StyledTestContent } from "./TextIndex.style";
import { RootState } from "@/stores/store";
import { useEffect, useState } from "react";

export default function TestContent() {
  return (
    <StyledTestContent>
      <TestProblemBox />
      <TestAnswerBox />
    </StyledTestContent>
  );
}
