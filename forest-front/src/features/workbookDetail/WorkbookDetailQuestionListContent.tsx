import { QuestionSummType } from "@/types/Workbook";
import { StyledWorkbookDetailQuestionListContentBox } from "./WorkbookDetail.style";
import WorkbookQuestionMoveBarList from "./WorkbookQuestionMoveBarList";

interface IProps {
  questionCnt: number;
  questionSumm: QuestionSummType[];
  setQuestionSum: React.Dispatch<React.SetStateAction<QuestionSummType[]>>;
  curQuestion: number;
  setCurQuestion: React.Dispatch<React.SetStateAction<number>>;
}

function WorkbookDetailQuestionListContent({
  questionCnt,
  questionSumm,
  setQuestionSum,
  curQuestion,
  setCurQuestion,
}: IProps) {
  return (
    <StyledWorkbookDetailQuestionListContentBox>
      <p>문제 ({questionCnt})</p>
      <WorkbookQuestionMoveBarList
        questionSumm={questionSumm}
        setQuestionSum={setQuestionSum}
        curQuestion={curQuestion}
        setCurQuestion={setCurQuestion}
      />
    </StyledWorkbookDetailQuestionListContentBox>
  );
}

export default WorkbookDetailQuestionListContent;
