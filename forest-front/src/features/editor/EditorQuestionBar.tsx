import { setCurQuestion, setQuestions } from "@/stores/editor/editorQuestions";
import { RootState } from "@/stores/store";
import { QuestionType } from "@/types/Workbook";
import { useDispatch, useSelector } from "react-redux";
import { EditorQuestionBarBox } from "./EditorQuestionList.style";
import { FaTrashAlt } from "react-icons/fa";
import useWorkbookDetailQuestionDelete from "@/apis/workbookDetail/useWorkbookDetailQuestionDelete";

interface IProps {
  question: QuestionType;
  num: number;
}

function EditorQuestionBar({ question, num }: IProps) {
  const dispatch = useDispatch();

  const { mutate: deleteApiCall } = useWorkbookDetailQuestionDelete();

  const { curQuestion } = useSelector((state: RootState) => state.editorQuestions);
  const { questions } = useSelector((state: RootState) => state.editorQuestions);
  const { isPointValidConfirm } = useSelector((state: RootState) => state.editorQuestions);
  const { isTitleValidConfirm } = useSelector((state: RootState) => state.editorQuestions);
  const { isAnswerValidConfirm } = useSelector((state: RootState) => state.editorQuestions);

  const handleClickBar = () => {
    if (isPointValidConfirm && isTitleValidConfirm && isAnswerValidConfirm) {
      dispatch(setCurQuestion(num));
    }
  };

  const handleClickDelete = (e: any) => {
    e.stopPropagation();

    // 저장된 문항인 경우에만 delete api call
    if (question.problemId) {
      deleteApiCall(question.problemId);
    }

    let deletedIdx = 0;

    const deletedQuestions = questions.filter((summ, i) => {
      if (i + 1 === num) {
        deletedIdx = i;
      }

      return i + 1 !== num;
    });
    dispatch(setQuestions([...deletedQuestions]));

    // 삭제한 요소가 마지막 요소였다면 바로 위 문항을 현재 문항으로 
    if (deletedIdx + 1 >= questions.length) {
      dispatch(setCurQuestion(num - 1));
    }
  };

  return (
    <EditorQuestionBarBox onClick={handleClickBar} isCur={curQuestion === num}>
      <span>{num}.&nbsp;</span>
      <span>{question.title}</span>
      <FaTrashAlt onClick={handleClickDelete} />
    </EditorQuestionBarBox>
  );
}

export default EditorQuestionBar;
