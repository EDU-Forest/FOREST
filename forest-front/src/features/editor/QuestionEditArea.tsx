import { useSelector } from "react-redux";
import { QuestionEditAreaBox } from "./Editor.style";
import EditorQuestionContent from "./EditorQuestionContent";
import { RootState } from "@/stores/store";

interface IProps {
  selectQuestionType: string;
}

function QuestionEditArea({ selectQuestionType }: IProps) {
  const { questions } = useSelector((state: RootState) => state.editQuestions);

  return (
    <QuestionEditAreaBox>
      {/* 문항이 있을 경우에만 렌더링 */}
      {questions.length !== 0 && <EditorQuestionContent selectQuestionType={selectQuestionType} />}
    </QuestionEditAreaBox>
  );
}

export default QuestionEditArea;
