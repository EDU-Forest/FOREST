import { QuestionSummType } from "@/types/Workbook";
import WorkbookQuestionMoveBar from "./WorkbookQuestionMoveBar";
import { StyledWorkbookQuestionMoveBarListBox } from "./WorkbookDetail.style";

interface IProps {
  questionSumm: QuestionSummType[];
}

function WorkbookQuestionMoveBarList({ questionSumm }: IProps) {
  return (
    <StyledWorkbookQuestionMoveBarListBox>
      {questionSumm.map((question, i) => (
        <WorkbookQuestionMoveBar key={question?.id} num={i + 1} question={question} />
      ))}
    </StyledWorkbookQuestionMoveBarListBox>
  );
}

export default WorkbookQuestionMoveBarList;
