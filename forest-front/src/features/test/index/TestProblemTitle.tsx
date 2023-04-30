import { useSelector } from "react-redux";
import TestProblemTitleLabel from "./TestProblemTitleLabel";
import { StyledTestProblemTitle, StyledTestProblemTitleContent } from "./TextIndex.style";
import { RootState } from "@/stores/store";

export default function TestProblemTitle() {
  const { problems } = useSelector((state: RootState) => state.exam);
  const { title } = problems[0];
  return (
    <StyledTestProblemTitle>
      <TestProblemTitleLabel />
      <StyledTestProblemTitleContent>{title}</StyledTestProblemTitleContent>
    </StyledTestProblemTitle>
  );
}
