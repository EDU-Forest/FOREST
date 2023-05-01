import { useState } from "react";
import { EditorShortAnswerBox } from "./EditorQuestionContent.style";

function EditorShortAnswer() {
  const [answer, setAnswer] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  return (
    <EditorShortAnswerBox>
      <input value={answer} placeholder="정답을 입력하세요" onChange={handleChange} />
    </EditorShortAnswerBox>
  );
}

export default EditorShortAnswer;
