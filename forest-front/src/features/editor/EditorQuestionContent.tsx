import { RootState } from "@/stores/store";
import { QuestionItemType } from "@/types/Workbook";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditorQuestionChoiceList from "./EditorQuestionChoiceList";
import {
  EditorQuestionContentBox,
  EditorQuestionItemAddButton,
  EditorQuestionNumbox,
  EditorQuestionTitleInput,
} from "./EditorQuestionContent.style";

interface IProps {
  selectQuestionType: string;
}

function EditorQuestionContent({ selectQuestionType }: IProps) {
  const [title, setTitle] = useState("");
  // 객관식 보기
  const [items, setItems] = useState<QuestionItemType[]>([]);
  const { questions } = useSelector((state: RootState) => state.editQuestions);
  // 현재 문항 번호
  const { curQuestion } = useSelector((state: RootState) => state.editQuestions);

  useEffect(() => {
    setItems([...questions[curQuestion - 1].items]);
    setTitle(questions[curQuestion - 1].title);
  }, [curQuestion]);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

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

  return (
    <>
      <EditorQuestionNumbox>{curQuestion}</EditorQuestionNumbox>
      <EditorQuestionContentBox>
        {/* 객관식 */}
        <div>
          <EditorQuestionTitleInput
            value={title}
            placeholder="문제를 입력하세요"
            onChange={handleChangeTitle}
          />
        </div>
        <EditorQuestionChoiceList items={items} setItems={setItems} />
        <EditorQuestionItemAddButton onClick={handleClickItemAdd}>
          <div>+</div>
          보기 추가
        </EditorQuestionItemAddButton>
      </EditorQuestionContentBox>
    </>
  );
}

export default EditorQuestionContent;
