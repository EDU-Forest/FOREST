import { setQuestions } from "@/stores/editor/editorQuestions";
import { RootState } from "@/stores/store";
import { QuestionType } from "@/types/Workbook";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditorOXAnswerBox, EditorOXBox } from "./EditorQuestionContent.style";

interface IProps {
  question: QuestionType;
  curQuestion: number;
}

function EditorOX({ question, curQuestion }: IProps) {
  const dispatch = useDispatch();

  const { questions } = useSelector((state: RootState) => state.editQuestions);

  const [answer, setAnswer] = useState("o");

  useEffect(() => {
    setAnswer(question.answer);
  }, [question]);

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
    <EditorOXBox>
      <EditorOXAnswerBox onClick={() => handleClick("o")} isAnswer={answer === "o"}>
        O
      </EditorOXAnswerBox>
      <EditorOXAnswerBox onClick={() => handleClick("x")} isAnswer={answer === "x"}>
        X
      </EditorOXAnswerBox>
    </EditorOXBox>
  );
}

export default EditorOX;
