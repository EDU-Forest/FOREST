import { setCurQuestion } from "@/stores/editor/editorQuestions";
import { RootState } from "@/stores/store";
import { QuestionType } from "@/types/Workbook";
import { useDispatch, useSelector } from "react-redux";
import { EditorQuestionBarBox } from "./EditorQuestionList.style";

interface IProps {
  question: QuestionType;
  num: number;
}

function EditorQuestionBar({ question, num }: IProps) {
  const dispatch = useDispatch();

  const { curQuestion } = useSelector((state: RootState) => state.editorQuestions);
  const { isPointValidConfirm } = useSelector((state: RootState) => state.editorQuestions);
  const { isTitleValidConfirm } = useSelector((state: RootState) => state.editorQuestions);
  const { isAnswerValidConfirm } = useSelector((state: RootState) => state.editorQuestions);

  const handleClickBar = () => {
    if (isPointValidConfirm && isTitleValidConfirm && isAnswerValidConfirm) {
      dispatch(setCurQuestion(num));
    }
  };

  return (
    <EditorQuestionBarBox onClick={handleClickBar} isCur={curQuestion === num}>
      <span>{num}.&nbsp;</span>
      <span>{question.title}</span>
    </EditorQuestionBarBox>
  );
}

export default EditorQuestionBar;
