import useEditor from "@/hooks/editor/useEditor";
import { RootState } from "@/stores/store";
import { QuestionType } from "@/types/Workbook";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EditorQuestionTextInput } from "./EditorQuestionContent.style";

interface IProps {
  question: QuestionType;
}

function EditorQuestionText({ question }: IProps) {
  const [text, setText] = useState("");
  const [toChangeQuestions] = useEditor();

  useEffect(() => {
    setText(question.text);
  }, [question.text]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    toChangeQuestions("text", e.target.value);
  };

  return (
    <EditorQuestionTextInput
      value={text}
      onChange={handleChange}
      placeholder="지문을 입력하세요"
    />
  );
}

export default EditorQuestionText;
