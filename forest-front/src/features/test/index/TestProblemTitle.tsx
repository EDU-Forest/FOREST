import TestProblemTitleLabel from "./TestProblemTitleLabel";
import { StyledTestProblemTitle, StyledTestProblemTitleContent } from "./index.style";

export default function TestProblemTitle() {
  return (
    <StyledTestProblemTitle>
      <TestProblemTitleLabel />
      <StyledTestProblemTitleContent>
        다음 글의 제목으로 가장 적절한 것은?
      </StyledTestProblemTitleContent>
    </StyledTestProblemTitle>
  );
}
