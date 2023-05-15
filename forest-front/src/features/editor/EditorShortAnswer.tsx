import { setIsAnswerValidConfirm, setQuestions } from "@/stores/editor/editorQuestions";
import { RootState } from "@/stores/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditorShortAnswerBox } from "./EditorQuestionContent.style";
import { ClassInputMsg } from "../class/teacher/AddClassModal.style";

function EditorShortAnswer() {
  const dispatch = useDispatch();

  const { questions } = useSelector((state: RootState) => state.editorQuestions);
  const { curQuestion } = useSelector((state: RootState) => state.editorQuestions);
  const { isAnswerValidConfirm } = useSelector((state: RootState) => state.editorQuestions);

  const [answer, setAnswer] = useState("");

  useEffect(() => {
    setAnswer(questions[curQuestion - 1]?.answer);
  }, [questions[curQuestion - 1]]);

  useEffect(() => {
    dispatch(setIsAnswerValidConfirm(answer ? true : false));
  }, [answer]);

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
      <input
        value={answer}
        placeholder="정답을 입력하세요"
        onChange={handleChange}
      />
      {!isAnswerValidConfirm && <ClassInputMsg>정답을 입력하세요</ClassInputMsg>}
    </EditorShortAnswerBox>
  );
}

export default EditorShortAnswer;
