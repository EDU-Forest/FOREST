import { useEffect, useState } from "react";
import EditorQuestionChoiceList from "./EditorQuestionChoiceList";
import { EditorQuestionItemAddButton } from "./EditorQuestionContent.style";
import { QuestionItemType, QuestionType } from "@/types/Workbook";

interface IProps {
  question: QuestionType;
}

function EditorMultipleChoice({ question }: IProps) {
  // 객관식 보기
  const [items, setItems] = useState<QuestionItemType[]>([]);

  const handleClickItemAdd = () => {
    setItems([
      ...items,
      {
        id: 0,
        no: items.length + 1,
        content: "",
        isImage: false,
      },
    ]);
  };

  useEffect(() => {
    setItems([...question.items]);
  }, [question]);

  return (
    <>
      <EditorQuestionChoiceList items={items} setItems={setItems} />
      <EditorQuestionItemAddButton onClick={handleClickItemAdd}>
        <div>+</div>
        보기 추가
      </EditorQuestionItemAddButton>
    </>
  );
}

export default EditorMultipleChoice;
