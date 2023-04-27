import { QuestionSummType } from "@/types/Workbook";
import { StyledWorkbookDetailQuestionListBox } from "./WorkbookDetail.style";
import WorkbookDetailQuestionListContent from "./WorkbookDetailQuestionListContent";
import WorkbookDetailQuestionVisibility from "./WorkbookDetailQuestionVisibility";

interface IProps {
  questionCnt: number;
  questionSumm: QuestionSummType[];
  curQuestion: number;
  setCurQuestion: React.Dispatch<React.SetStateAction<number>>;
}

function WorkbookDetailQuestionList({
  questionCnt,
  questionSumm,
  curQuestion,
  setCurQuestion,
}: IProps) {
  return (
    <StyledWorkbookDetailQuestionListBox>
      <WorkbookDetailQuestionVisibility />
      <WorkbookDetailQuestionListContent
        questionCnt={questionCnt}
        questionSumm={questionSumm}
        curQuestion={curQuestion}
        setCurQuestion={setCurQuestion}
      />
    </StyledWorkbookDetailQuestionListBox>
  );
}

export default WorkbookDetailQuestionList;
