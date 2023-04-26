import { StyledWorkbookDetailQuestionListContentBox } from "./WorkbookDetail.style";
import WorkbookQuestionMoveBar from "./WorkbookQuestionMoveBar";

interface IProps {
  questionCnt: number;
  questionSumm: object[];
}

function WorkbookDetailQuestionListContent({ questionCnt, questionSumm }: IProps) {
  return (
    <StyledWorkbookDetailQuestionListContentBox>
      <p>문제 ({questionCnt})</p>
      <div>
        {questionSumm.map((question) => (
          <WorkbookQuestionMoveBar question={question} />
        ))}
      </div>
    </StyledWorkbookDetailQuestionListContentBox>
  );
}

export default WorkbookDetailQuestionListContent;
