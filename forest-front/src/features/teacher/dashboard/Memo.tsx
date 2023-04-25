import { StyledSectionBox } from "./Dashboard.style";
import MemoList from "./MemoList";
import MemoUploadInput from "./MemoUploadInput";

function Memo() {
  return (
    <StyledSectionBox>
      <MemoUploadInput />
      <MemoList />
    </StyledSectionBox>
  );
}

export default Memo;
