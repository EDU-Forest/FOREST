import { useState } from "react";
import { StyledMemoUploadInputBox } from "./Memo.style";
import MemoUploadBtn from "./MemoUploadBtn";
import useMemoWrite from "@/apis/dashboard/useMemoWrite";

function MemoUploadInput() {
  const [memo, setMemo] = useState("");
  const { mutate } = useMemoWrite();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMemo(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    // 엔터 키 눌리면 메모 등록
    if (e.key === "Enter") {
      console.log(memo);
      mutate(memo);
      setMemo("");
    }
  };

  const handleClick = () => {
    mutate(memo);
    setMemo("");
  };

  return (
    <StyledMemoUploadInputBox>
      <input type="text" value={memo} onChange={handleChange} onKeyDown={handleKeyPress} />
      <MemoUploadBtn onClick={handleClick} />
    </StyledMemoUploadInputBox>
  );
}

export default MemoUploadInput;
