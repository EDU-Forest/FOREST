import { QuestionType } from "@/types/Workbook";
import { EditorQuestionBarBox } from "./EditorQuestionList.style";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { setCurQuestion } from "@/stores/editor/editorQuestions";

interface IProps {
  question: QuestionType;
  num: number;
}

function EditorQuestionBar({ question, num }: IProps) {
  const dispatch = useDispatch();

  const { curQuestion } = useSelector((state: RootState) => state.editQuestions);

  const handleClickBar = () => {
    dispatch(setCurQuestion(num));
  };

  return (
    <EditorQuestionBarBox onClick={handleClickBar} isCur={curQuestion === num}>
      <span>{num}.&nbsp;</span>
      <span>{question.title}</span>
    </EditorQuestionBarBox>
  );
}

export default EditorQuestionBar;
