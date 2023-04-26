import { StyledWorkbookDetailQuestionListBox } from "./WorkbookDetail.style";
import WorkbookDetailQuestionListContent from "./WorkbookDetailQuestionListContent";
import WorkbookDetailQuestionVisibility from "./WorkbookDetailQuestionVisibility";

interface IProps {
  questionCnt: number;
  questionSumm: object[];
}

function WorkbookDetailQuestionList({ questionCnt, questionSumm }: IProps) {
  return (
    <StyledWorkbookDetailQuestionListBox>
      <WorkbookDetailQuestionVisibility />
      <WorkbookDetailQuestionListContent questionCnt={questionCnt} questionSumm={questionSumm}/>
    </StyledWorkbookDetailQuestionListBox>
  );
}

export default WorkbookDetailQuestionList;
