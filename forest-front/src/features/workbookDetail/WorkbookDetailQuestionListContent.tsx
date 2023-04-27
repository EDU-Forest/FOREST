import { QuestionSummType } from "@/types/Workbook";
import { StyledWorkbookDetailQuestionListContentBox } from "./WorkbookDetail.style";
import WorkbookQuestionMoveBar from "./WorkbookQuestionMoveBar";
import WorkbookQuestionMoveBarList from "./WorkbookQuestionMoveBarList";

interface IProps {
  questionCnt: number;
  questionSumm: QuestionSummType[];
}

function WorkbookDetailQuestionListContent({ questionCnt, questionSumm }: IProps) {
  return (
    <StyledWorkbookDetailQuestionListContentBox>
      <p>문제 ({questionCnt})</p>
      <WorkbookQuestionMoveBarList questionSumm={questionSumm}/>
    </StyledWorkbookDetailQuestionListContentBox>
  );
}

export default WorkbookDetailQuestionListContent;
