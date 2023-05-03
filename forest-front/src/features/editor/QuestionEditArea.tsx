import { QuestionEditAreaBox } from "./Editor.style";
import EditorQuestionContent from "./EditorQuestionContent";

interface IProps {
  selectQuestionType: string;
}

function QuestionEditArea({ selectQuestionType }: IProps) {
  return (
    <QuestionEditAreaBox>
      <EditorQuestionContent selectQuestionType={selectQuestionType} />
    </QuestionEditAreaBox>
  );
}

export default QuestionEditArea;
