import { StyledTextBtn } from "@/components/Button/Btn.style";
import QuestionChoiceList from "@/components/Question/QuestionChoiceList";
import { QuestionSummType, QuestionType } from "@/types/Workbook";
import { useEffect, useState } from "react";
import {
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
  isOriginal: boolean;
}

function WorkbookDetailQuestion({
  question,
  curQuestion,
  setCurQuestion,
  questionSumm,
  isOriginal,
}: IProps) {
  const [curQuestionNum, setCurQuestionNum] = useState(1);

  const getQuestionNum = (): void => {
    for (let i = 0; i < questionSumm.length; i++) {
      if (questionSumm[i].id === curQuestion) {
        setCurQuestionNum(i + 1);
      }
    }
  };

  const handleClickEdit = () => {};

  useEffect(() => {
    getQuestionNum();
  }, [questionSumm, curQuestion]);

  return (
    <StyledWorkbookDetailQuestionBox>
      {/* 문항이 존재할 경우에만 렌더링 */}
      {question && (
        <StyledQuestionDetailTitleBox>
          <StyledQuestionDetailNumBox>{curQuestionNum}</StyledQuestionDetailNumBox>
          <span>{question?.title}</span>
          {/* 내가 원작자여야만 수정 가능 */}
          {isOriginal && <StyledTextBtn>수정</StyledTextBtn>}
        </StyledQuestionDetailTitleBox>
      )}

      {/* 지문이 있다면 지문 렌더링 */}
      {question?.text && (
        <StyledQuestionDetailTextBox>{question?.text}</StyledQuestionDetailTextBox>
      )}
      {/* 이미지가 있다면 이미지 렌더링 */}
      {question?.problemImgPath && <img src={question?.problemImgPath} alt="question" />}

      {/* 객관식 보기 */}
      {question?.type === "MULTIPLE" && <QuestionChoiceList items={question?.itemList} />}
    </StyledWorkbookDetailQuestionBox>
  );
}

export default WorkbookDetailQuestion;
