import { QuestionItemType } from "@/types/Workbook";
import { useState } from "react";
import { AiOutlineCheck, AiOutlineMinusCircle } from "react-icons/ai";
import {
  EditorChoiceNumBox,
  EditorQuestionChoiceBox,
  EditorQuestionChoiceListBox,
} from "./EditorQuestionContent.style";

interface IProps {
  items: QuestionItemType[];
  setItems: React.Dispatch<React.SetStateAction<QuestionItemType[]>>;
}

function EditorQuestionChoiceList({ items, setItems }: IProps) {
  const [content, setContent] = useState("");
  const [corret, setCorret] = useState(0);

  const handleChangeItem = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const copyArr = [...items];
    copyArr.splice(i, 1, { ...copyArr[i], content: e.target.value });
    setItems([...copyArr]);
  };

  const handleClickDelete = (i: number) => {
    setItems(items.filter((item, idx) => idx !== i));
  };

  const handleClickItem = (num: number) => {
    setCorret(num);
  };

  return (
    <EditorQuestionChoiceListBox>
      {items.map((item, i) => {
        return (
          <div>
            <EditorQuestionChoiceBox isCorrect={corret === i + 1}>
              <EditorChoiceNumBox
                onClick={() => handleClickItem(i + 1)}
                isCorrect={corret === i + 1}
              >
                {i + 1}
              </EditorChoiceNumBox>
              {/* 이미지 형식의 보기라면 이미지 렌더링 */}
              {item.isImage ? (
                <img src={item.content} alt="item" />
              ) : (
                <>
                  <input
                    value={item.content}
                    placeholder="보기를 입력하세요"
                    onChange={(e) => handleChangeItem(i, e)}
                  />
                </>
              )}
              <AiOutlineCheck />
            </EditorQuestionChoiceBox>
            <AiOutlineMinusCircle onClick={() => handleClickDelete(i)} />
          </div>
        );
      })}
    </EditorQuestionChoiceListBox>
  );
}

export default EditorQuestionChoiceList;
