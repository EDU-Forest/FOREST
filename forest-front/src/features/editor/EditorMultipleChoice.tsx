import { setQuestions } from "@/stores/editor/editorQuestions";
import { RootState } from "@/stores/store";
import { QuestionItemType, QuestionType } from "@/types/Workbook";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditorQuestionChoiceList from "./EditorQuestionChoiceList";
import { EditorQuestionItemAddButton } from "./EditorQuestionContent.style";

interface IProps {
  question: QuestionType;
  curQuestion: number;
}

function EditorMultipleChoice({ question, curQuestion }: IProps) {
  const dispatch = useDispatch();

  const { questions } = useSelector((state: RootState) => state.editorQuestions);

  // 객관식 보기
  const [items, setItems] = useState<QuestionItemType[]>([]);

  const itemChange = (items: QuestionItemType[]) => {
    const copyArr = [...questions];
    copyArr.splice(curQuestion - 1, 1, {
      ...questions[curQuestion - 1],
      itemList: items,
    });

    dispatch(setQuestions([...copyArr]));
  };

  const handleClickItemAdd = () => {
    setItems([
      ...items,
      {
        itemId: 0,
        no: items.length + 1,
        content: "",
        isImage: false,
      },
    ]);

    itemChange([
      ...items,
      {
        itemId: 0,
        no: items.length + 1,
        content: "",
        isImage: false,
      },
    ]);
  };

  useEffect(() => {
    setItems([...question.itemList]);
  }, [question]);

  return (
    <>
      <EditorQuestionChoiceList
        question={question}
        items={items}
        setItems={setItems}
        itemChange={itemChange}
      />
      <EditorQuestionItemAddButton onClick={handleClickItemAdd}>
        <div>+</div>
        보기 추가
      </EditorQuestionItemAddButton>
    </>
  );
}

export default EditorMultipleChoice;
