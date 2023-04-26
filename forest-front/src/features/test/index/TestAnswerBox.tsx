import TestAnswerTable from "./TestAnswerTable";
import { StyledAnswerBox, StyledUsername } from "./index.style";

export default function TestAnswerBox() {
  return (
    <StyledAnswerBox>
      <StyledUsername>응시자 : {"양희제"}</StyledUsername>
      <TestAnswerTable />
    </StyledAnswerBox>
  );
}
