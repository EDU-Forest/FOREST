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
  }, [questionSumm, curQuestion]);

  return (
    <StyledWorkbookDetailQuestionBox>
      <StyledQuestionDetailTitleBox>
        <StyledQuestionDetailNumBox>{curQuestionNum}</StyledQuestionDetailNumBox>
        <span>{question?.title}</span>
        <StyledTextBtn>수정</StyledTextBtn>
      </StyledQuestionDetailTitleBox>

      {/* 지문이 있다면 지문 렌더링 */}
      {question.text && <StyledQuestionDetailTextBox>{question.text}</StyledQuestionDetailTextBox>}
      {/* 이미지가 있다면 이미지 렌더링 */}
      {question.image && <img src={question.image} alt="question" />}

      {/* 객관식 보기 */}
      {question.type === "객관식" && (
        <StyledQuestionDetailChoiceListBox>
          {question.items.map((item) => {
            return (
              <StyledQuestionDetailChoiceBox>
                <StyledQuestionChoiceNumBox>{item.no}</StyledQuestionChoiceNumBox>
                {/* 이미지 형식의 보기라면 이미지 렌더링 */}
                {item.isImage ? <img src={item.content} alt="item" /> : <span>{item.content}</span>}
              </StyledQuestionDetailChoiceBox>
            );
          })}
        </StyledQuestionDetailChoiceListBox>
      )}
    </StyledWorkbookDetailQuestionBox>
  );
}

export default WorkbookDetailQuestion;
