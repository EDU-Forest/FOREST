import Canvas from "@/features/canvas/Canvas";
import TestAnswerBox from "./TestAnswerBox";
import TestProblemBox from "./TestProblemBox";
import { StyledTestContent, TestCanvas } from "./TextIndex.style";

import { IStudyModal } from "@/types/Study";

interface Iprops extends IStudyModal {
  isSubmitted?: boolean;
}

export default function TestContent() {
  return (
    <StyledTestContent>
      {/* <TestCanvas> */}
      <Canvas />
      {/* </TestCanvas> */}
      <TestProblemBox />
      <TestAnswerBox />
    </StyledTestContent>
  );
}
