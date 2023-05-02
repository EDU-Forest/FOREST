import { setQuestions } from "@/stores/editor/editorQuestions";
import { RootState } from "@/stores/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditorShortAnswerBox } from "./EditorQuestionContent.style";

function EditorShortAnswer() {
  const dispatch = useDispatch();

  const { questions } = useSelector((state: RootState) => state.editQuestions);
  const { curQuestion } = useSelector((state: RootState) => state.editQuestions);

  const [answer, setAnswer] = useState("");

  useEffect(() => {
    setAnswer(questions[curQuestion - 1].answer);
  }, [questions[curQuestion - 1]]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);

    const copyArr = [...questions];
    copyArr.splice(curQuestion - 1, 1, {
      ...questions[curQuestion - 1],
      answer: e.target.value,
    });

    dispatch(setQuestions([...copyArr]));
  };

  return (
    <EditorShortAnswerBox>
      <input value={answer} placeholder="정답을 입력하세요" onChange={handleChange} />
    </EditorShortAnswerBox>
  );
}

export default EditorShortAnswer;
