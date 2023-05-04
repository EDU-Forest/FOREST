import { QuestionSummType } from "@/types/Workbook";
import { AiOutlineHolder } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { StyledWorkbookQuestionMoveBar } from "./WorkbookDetail.style";

interface IProps {
  num: number;
  question: QuestionSummType;
  isSelected: boolean;
  questionSumm: QuestionSummType[];
  setQuestionSum: React.Dispatch<React.SetStateAction<QuestionSummType[]>>;
  setCurQuestion: React.Dispatch<React.SetStateAction<number>>;
}

function WorkbookQuestionMoveBar({
  num,
  question,
  isSelected,
  questionSumm,
  setQuestionSum,
  setCurQuestion,
}: IProps) {
  const handleClickDelete = (e: any) => {
    e.stopPropagation();
    
    let deletedIdx = 0;
    const deletedQuestions = questionSumm.filter((summ, i) => {
      if (i + 1 === num) {
        deletedIdx = i;
      }

      return i + 1 !== num;
    });
    setQuestionSum([...deletedQuestions]);

    // 삭제한 요소 다음 요소를 현재 문제로
    if (deletedIdx + 1 >= questionSumm.length) {
      setCurQuestion(questionSumm[questionSumm.length - 1].id);
    } else {
      setCurQuestion(questionSumm[deletedIdx + 1].id);
    }
  };

  return (
    <StyledWorkbookQuestionMoveBar isSelected={isSelected} draggable>
      <AiOutlineHolder />
      <span>{num}.&nbsp;</span>
      <span>{question?.title}</span>
      <FaTrashAlt onClick={handleClickDelete} />
    </StyledWorkbookQuestionMoveBar>
  );
}

export default WorkbookQuestionMoveBar;
