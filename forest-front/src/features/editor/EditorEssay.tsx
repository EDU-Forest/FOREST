import { useState } from "react";
import EditorShortAnswer from "./EditorShortAnswer";
import { EditorEssayBox, EditorEssayKeywordsBox } from "./EditorQuestionContent.style";

function EditorEssay() {
  const [answers, setAnswers] = useState<string[]>([]);

  const handleChangeAnswer = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const copyArr = [...answers];
    copyArr.splice(i, 1, e.target.value);
    setAnswers([...copyArr]);
  };
  const handleClickAddAnswer = () => {
    setAnswers([...answers, ""]);
  };

  return (
    <EditorEssayBox>
      <EditorShortAnswer />
      <p>채점 핵심 단어</p>
      <EditorEssayKeywordsBox>
        {answers.map((ans: string, i) => (
          <input
            key={i}
            value={ans}
            placeholder="단어"
            onChange={(e) => handleChangeAnswer(i, e)}
          />
        ))}
        <button onClick={handleClickAddAnswer}>
          핵심 단어&nbsp;<span>+</span>
        </button>
      </EditorEssayKeywordsBox>
    </EditorEssayBox>
  );
}

export default EditorEssay;
