import useMemoWrite from "@/apis/dashboard/useMemoWrite";
import { TextMaxCnt } from "@/styles/text";
import { useState } from "react";
import { StyledMemoUploadInputBox } from "./Memo.style";
import MemoUploadBtn from "./MemoUploadBtn";

function MemoUploadInput() {
  const [memo, setMemo] = useState("");
  const { mutate } = useMemoWrite();
  const maxLen = 255;

  const getMemoTextCnt = (): number => {
    return memo.length;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    e.target.value.length > maxLen
      ? setMemo(e.target.value.slice(0, maxLen))
      : setMemo(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    // 엔터 키 눌리면 메모 등록
    // if (memo.trim() && e.key === "Enter") {
    //   mutate(memo);
    //   setMemo("");
    // }
  };

  const handleClick = () => {
    if (memo.trim()) {
      mutate(memo);
      setMemo("");
    }
  };

  return (
    <>
      <StyledMemoUploadInputBox>
        <textarea
          // type="text"
          rows={2}
          value={memo}
          maxLength={maxLen}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleKeyPress(e)}
        />
        <MemoUploadBtn onClick={handleClick} />
      </StyledMemoUploadInputBox>
      <TextMaxCnt>
        {getMemoTextCnt()} / {maxLen}자
      </TextMaxCnt>
    </>
  );
}

export default MemoUploadInput;
