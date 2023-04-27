import { StyledTextBtn } from "@/components/Button/Btn.style";
import { QuestionSummType, QuestionType } from "@/types/Workbook";
import { useEffect, useState } from "react";
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
  questionSumm: QuestionSummType[];
}

function WorkbookDetailQuestion({ question, curQuestion, setCurQuestion, questionSumm }: IProps) {
  const [curQuestionNum, setCurQuestionNum] = useState(1);

  const getQuestionNum = (): void => {
    for (let i = 0; i < questionSumm.length; i++) {
      if (questionSumm[i].id === curQuestion) {
        setCurQuestionNum(i + 1);
      }
    }
  };

  useEffect(() => {
    getQuestionNum();
  }, [questionSumm]);
  
  useEffect(() => {
    console.log(curQuestionNum);
  }, [curQuestionNum]);

  return (
    // 객관식
    <StyledWorkbookDetailQuestionBox>
      <StyledQuestionDetailTitleBox>
        <StyledQuestionDetailNumBox>{curQuestionNum}</StyledQuestionDetailNumBox>
        {/* <StyledQuestionDetailNumBox>{question?.problemNum}</StyledQuestionDetailNumBox> */}
        <span>{question?.title}</span>
        <StyledTextBtn>수정</StyledTextBtn>
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
