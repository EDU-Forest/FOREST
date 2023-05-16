import useEditor from "@/hooks/editor/useEditor";
import { RootState } from "@/stores/store";
import { QuestionType } from "@/types/Workbook";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EditorQuestionTextBox, EditorQuestionTextInput } from "./EditorQuestionContent.style";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setQuestions } from "@/stores/editor/editorQuestions";

interface IProps {
  question: QuestionType;
}

function EditorQuestionText({ question }: IProps) {
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const { toChangeQuestions } = useEditor();
  const { questions } = useSelector((state: RootState) => state.editorQuestions);
  const { curQuestion } = useSelector((state: RootState) => state.editorQuestions);

  useEffect(() => {
    setText(question?.text);
  }, [question?.text]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    toChangeQuestions("text", e.target.value);
  };

  const handleClickDelete = () => {
    const copyArr = [...questions];
    copyArr.splice(curQuestion - 1, 1, { ...questions[curQuestion - 1], textIsEmpty: true, text: "" });
    dispatch(setQuestions([...copyArr]));
  };

  return (
    <EditorQuestionTextBox>
      <AiOutlineMinusCircle onClick={handleClickDelete}/>
      <EditorQuestionTextInput
        value={text}
        onChange={handleChange}
        placeholder="지문을 입력하세요"
      />
    </EditorQuestionTextBox>
  );
}

export default EditorQuestionText;
