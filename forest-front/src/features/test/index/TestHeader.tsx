import TestHeaderLeftContentBox from "./TestHeaderLeftContentBox";
import TestHeaderRightContentBox from "./TestHeaderRightContentBox";
import { StyledTestHeader } from "./TextIndex.style";

export default function TestHeader() {
  return (
    <StyledTestHeader>
      <TestHeaderLeftContentBox />
      <TestHeaderRightContentBox />
    </StyledTestHeader>
  );
}
