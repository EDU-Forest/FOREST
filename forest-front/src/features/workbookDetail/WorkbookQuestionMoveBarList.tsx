import { QuestionSummType } from "@/types/Workbook";
import { StyledWorkbookQuestionMoveBarListBox } from "./WorkbookDetail.style";
import WorkbookQuestionMoveBar from "./WorkbookQuestionMoveBar";

interface IProps {
  questionSumm: QuestionSummType[];
  curQuestion: number;
  setCurQuestion: React.Dispatch<React.SetStateAction<number>>;
}

function WorkbookQuestionMoveBarList({ questionSumm, curQuestion, setCurQuestion }: IProps) {
  const handleClickMoveBar = (num: number) => {
    setCurQuestion(num);
  };

  return (
    <StyledWorkbookQuestionMoveBarListBox>
      {questionSumm.map((question, i) => (
        <div onClick={() => handleClickMoveBar(i + 1)}>
          <WorkbookQuestionMoveBar
            key={question?.id}
            num={i + 1}
            question={question}
            isSelected={i + 1 === curQuestion}
          />
        </div>
      ))}
    </StyledWorkbookQuestionMoveBarListBox>
  );
}

export default WorkbookQuestionMoveBarList;
