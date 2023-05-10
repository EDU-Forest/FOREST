import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";
import { QuestionEditAreaBox } from "./Editor.style";
import EditorQuestionContent from "./EditorQuestionContent";

interface IProps {
  selectQuestionType: string;
}

function QuestionEditArea({ selectQuestionType }: IProps) {
  const { questions } = useSelector((state: RootState) => state.editorQuestions);

  return (
    <QuestionEditAreaBox>
      {/* 문항이 있을 경우에만 렌더링 */}
      {questions.length !== 0 ? (
        <EditorQuestionContent selectQuestionType={selectQuestionType} />
      ) : (
        <span>문항이 없습니다</span>
      )}
    </QuestionEditAreaBox>
  );
}

export default QuestionEditArea;
