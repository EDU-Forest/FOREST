import { useState } from "react";
import { StyledMemoUploadInputBox } from "./Memo.style";
import MemoUploadBtn from "./MemoUploadBtn";

function MemoUploadInput() {
  const [memo, setMemo] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMemo(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    // 엔터 키 눌리면 메모 등록
    if (e.key === "Enter") {
      console.log(memo);

      // 등록 성공하면 input 초기화
      setMemo("");
    }
  };

  return (
    <StyledMemoUploadInputBox>
      <input type="text" value={memo} onChange={handleChange} onKeyDown={handleKeyPress} />
      <MemoUploadBtn />
    </StyledMemoUploadInputBox>
  );
}

export default MemoUploadInput;
