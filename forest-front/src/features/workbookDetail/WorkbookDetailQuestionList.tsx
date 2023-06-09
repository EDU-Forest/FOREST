import { RootState } from "@/stores/store";
import { QuestionSummType } from "@/types/Workbook";
import { useSelector } from "react-redux";
import { StyledWorkbookDetailQuestionListBox } from "./WorkbookDetail.style";
import WorkbookDetailQuestionListContent from "./WorkbookDetailQuestionListContent";
import WorkbookDetailQuestionVisibility from "./WorkbookDetailQuestionVisibility";

interface IProps {
  questionCnt: number;
  questionSumm: QuestionSummType[];
  setQuestionSum: React.Dispatch<React.SetStateAction<QuestionSummType[]>>;
  curQuestion: number;
  setCurQuestion: React.Dispatch<React.SetStateAction<number>>;
}

function WorkbookDetailQuestionList({
  questionCnt,
  questionSumm,
  setQuestionSum,
  curQuestion,
  setCurQuestion,
}: IProps) {
  const { workbook } = useSelector((state: RootState) => state.workbookDetail);

  return (
    <StyledWorkbookDetailQuestionListBox>
      {workbook?.isOriginal && workbook?.isDeploy && <WorkbookDetailQuestionVisibility />}
      <WorkbookDetailQuestionListContent
        questionCnt={questionCnt}
        questionSumm={questionSumm}
        setQuestionSum={setQuestionSum}
        curQuestion={curQuestion}
        setCurQuestion={setCurQuestion}
      />
    </StyledWorkbookDetailQuestionListBox>
  );
}

export default WorkbookDetailQuestionList;
