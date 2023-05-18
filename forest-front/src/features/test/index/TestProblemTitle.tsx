import { useSelector } from "react-redux";
import TestProblemTitleLabel from "./TestProblemTitleLabel";
import { StyledTestProblemTitle, StyledTestProblemTitleContent } from "./TextIndex.style";
import { RootState } from "@/stores/store";

export default function TestProblemTitle() {
  const { problem, curProblemNum } = useSelector((state: RootState) => state.exam);
  const { title, point } = problem[curProblemNum - 1];

  return (
    <StyledTestProblemTitle>
      <TestProblemTitleLabel />
      <StyledTestProblemTitleContent>
        {title} {`(${point}점)`}
      </StyledTestProblemTitleContent>
    </StyledTestProblemTitle>
  );
}
