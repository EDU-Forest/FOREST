import { setIsAnswerValidConfirm, setQuestions } from "@/stores/editor/editorQuestions";
import { RootState } from "@/stores/store";
import { QuestionType } from "@/types/Workbook";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClassInputMsg } from "../class/teacher/AddClassModal.style";
import { EditorOXAnswerBox, EditorOXBox } from "./EditorQuestionContent.style";

interface IProps {
  question: QuestionType;
  curQuestion: number;
}

function EditorOX({ question, curQuestion }: IProps) {
  const dispatch = useDispatch();

  const { questions } = useSelector((state: RootState) => state.editorQuestions);
  const { isAnswerValidConfirm } = useSelector((state: RootState) => state.editorQuestions);

  const [answer, setAnswer] = useState("O");

  useEffect(() => {
    setAnswer(question.answer);
  }, [question]);

  useEffect(() => {
    dispatch(setIsAnswerValidConfirm(answer ? true : false));
  }, [answer]);

  const handleClick = (answer: string) => {
    setAnswer(answer);

    const copyArr = [...questions];
    copyArr.splice(curQuestion - 1, 1, {
      ...questions[curQuestion - 1],
      answer: answer,
    });

    dispatch(setQuestions([...copyArr]));
  };

  return (
    <>
      <EditorOXBox>
        <EditorOXAnswerBox onClick={() => handleClick("O")} isAnswer={answer === "O"}>
          O
        </EditorOXAnswerBox>
        <EditorOXAnswerBox onClick={() => handleClick("X")} isAnswer={answer === "X"}>
          X
        </EditorOXAnswerBox>
      </EditorOXBox>
      {!isAnswerValidConfirm && <ClassInputMsg>정답을 선택하세요</ClassInputMsg>}
    </>
  );
}

export default EditorOX;
