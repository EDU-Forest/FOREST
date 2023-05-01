import { useState } from "react";
import { EditorOXAnswerBox, EditorOXBox } from "./EditorQuestionContent.style";

function EditorOX() {
  const [answer, setAnswer] = useState("");

  const handleClick = (answer: string) => {
    setAnswer(answer);
  };

  return (
    <EditorOXBox>
      <EditorOXAnswerBox onClick={() => handleClick("o")} isAnswer={answer === 'o'}>O</EditorOXAnswerBox>
      <EditorOXAnswerBox onClick={() => handleClick("x")} isAnswer={answer === 'x'}>X</EditorOXAnswerBox>
    </EditorOXBox>
  );
}

export default EditorOX;
