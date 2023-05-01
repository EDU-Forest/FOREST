import {
  StyledQuestionChoiceNumBox,
  StyledQuestionDetailChoiceBox,
  StyledQuestionDetailChoiceListBox,
} from "@/features/workbookDetail/WorkbookDetail.style";
import { QuestionItemType } from "@/types/Workbook";
import { useState } from "react";

interface IProps {
  items: QuestionItemType[];
  isEdit?: boolean;
}

function QuestionChoiceList({ items, isEdit }: IProps) {
  const [content, setContent] = useState("");

  const handleChangeItems = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    items.splice(i, 1, { ...items[i], content: e.target.value });
  };

  return (
    <StyledQuestionDetailChoiceListBox>
      {items.map((item, i) => {
        return (
          <StyledQuestionDetailChoiceBox>
            <StyledQuestionChoiceNumBox>{i + 1}</StyledQuestionChoiceNumBox>
            {/* 이미지 형식의 보기라면 이미지 렌더링 */}
            {item.isImage ? (
              <img src={item.content} alt="item" />
            ) : isEdit ? (
              <input
                value={item.content}
                placeholder="보기를 입력하세요"
                onChange={(e) => handleChangeItems(i, e)}
              />
            ) : (
              <span>{item.content}</span>
            )}
          </StyledQuestionDetailChoiceBox>
        );
      })}
    </StyledQuestionDetailChoiceListBox>
  );
}

export default QuestionChoiceList;
