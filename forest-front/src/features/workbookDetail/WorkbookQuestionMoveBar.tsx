import { QuestionSummType } from "@/types/Workbook";
import { AiOutlineHolder } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { StyledWorkbookQuestionMoveBar } from "./WorkbookDetail.style";

interface IProps {
  num: number;
  question: QuestionSummType;
  isSelected: boolean;
}

function WorkbookQuestionMoveBar({ num, question, isSelected }: IProps) {
  return (
    <StyledWorkbookQuestionMoveBar isSelected={isSelected} draggable>
      <AiOutlineHolder />
      <span>{num}.&nbsp;</span>
      <span>{question?.title}</span>
      <FaTrashAlt />
    </StyledWorkbookQuestionMoveBar>
  );
}

export default WorkbookQuestionMoveBar;
