import { AiOutlineArrowUp } from "react-icons/ai";
import { StyledMemoUploadBtn } from "./Memo.style";

interface Iprops {
  onClick: () => void;
}

function MemoUploadBtn({ onClick }: Iprops) {
  return (
    <StyledMemoUploadBtn onClick={onClick}>
      <AiOutlineArrowUp />
    </StyledMemoUploadBtn>
  );
}

export default MemoUploadBtn;
