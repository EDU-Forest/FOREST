import {
  StyledQuestionChoiceNumBox,
  StyledQuestionDetailChoiceBox,
  StyledQuestionDetailChoiceListBox,
} from "@/features/workbookDetail/WorkbookDetail.style";
import { QuestionItemType } from "@/types/Workbook";

interface IProps {
  items: QuestionItemType[];
}

function QuestionChoiceList({ items }: IProps) {
  return (
    <StyledQuestionDetailChoiceListBox>
      {items &&
        items.map((item, i) => {
          return (
            <StyledQuestionDetailChoiceBox key={`detail-choice-${i}`}>
              <StyledQuestionChoiceNumBox>{i + 1}</StyledQuestionChoiceNumBox>
              {/* 이미지 형식의 보기라면 이미지 렌더링 */}
              {item.isImage ? <img src={item.content} alt="item" /> : <span>{item.content}</span>}
            </StyledQuestionDetailChoiceBox>
          );
        })}
    </StyledQuestionDetailChoiceListBox>
  );
}

export default QuestionChoiceList;
