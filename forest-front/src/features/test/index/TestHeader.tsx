import TestHeaderLeftContentBox from "./TestHeaderLeftContentBox";
import TestHeaderRightContentBox from "./TestHeaderRightContentBox";
import { StyledTestHeader } from "./index.style";

export default function TestHeader() {
  return (
    <StyledTestHeader>
      <TestHeaderLeftContentBox />
      <TestHeaderRightContentBox />
    </StyledTestHeader>
  );
}
