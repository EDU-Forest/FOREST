import { QuestionType } from "@/types/Workbook";
import {
  StyledQuestionChoiceNumBox,
  StyledQuestionDetailChoiceBox,
  StyledQuestionDetailChoiceListBox,
  StyledQuestionDetailNumBox,
  StyledQuestionDetailTextBox,
  StyledQuestionDetailTitleBox,
  StyledWorkbookDetailQuestionBox,
} from "./WorkbookDetail.style";

interface IProps {
  question: QuestionType;
  curQuestion: number;
  setCurQuestion: React.Dispatch<React.SetStateAction<number>>;
}

function WorkbookDetailQuestion({ question, curQuestion, setCurQuestion }: IProps) {
  return (
    // 객관식
    <StyledWorkbookDetailQuestionBox>
      <StyledQuestionDetailTitleBox>
        <StyledQuestionDetailNumBox>{question?.problemNum}</StyledQuestionDetailNumBox>
        <span>{question?.title}</span>
      </StyledQuestionDetailTitleBox>

      {/* 지문이 있다면 지문 렌더링 */}
      {question.text && <StyledQuestionDetailTextBox>{question.text}</StyledQuestionDetailTextBox>}

      {/* 객관식 보기 */}
      <StyledQuestionDetailChoiceListBox>
        {question.items.map((item) => {
          return (
            <StyledQuestionDetailChoiceBox>
              <StyledQuestionChoiceNumBox>{item.no}</StyledQuestionChoiceNumBox>
              <span>{item.content}</span>
            </StyledQuestionDetailChoiceBox>
          );
        })}
      </StyledQuestionDetailChoiceListBox>
    </StyledWorkbookDetailQuestionBox>
  );
}

export default WorkbookDetailQuestion;
