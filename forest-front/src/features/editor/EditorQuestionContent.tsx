import QuestionChoiceList from "@/components/Question/QuestionChoiceList";
import { useState } from "react";
import { EditorQuestionContentBox, EditorQuestionTitleInput } from "./EditorQuestionContent.style";

interface IProps {
  selectQuestionType: string;
}

function EditorQuestionContent({ selectQuestionType }: IProps) {
  const [title, setTitle] = useState("");
  // 객관식 보기
  const [items, setItems] = useState([
    {
      id: 0,
      no: 1,
      content: "",
      isImage: false,
    },
    {
      id: 0,
      no: 2,
      content: "",
      isImage: false,
    },
    {
      id: 0,
      no: 3,
      content: "",
      isImage: false,
    },
    {
      id: 0,
      no: 4,
      content: "",
      isImage: false,
    },
  ]);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeItems = (num: number, e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <EditorQuestionContentBox>
      {/* 객관식 */}
      <div>
        <EditorQuestionTitleInput
          value={title}
          placeholder="문제를 입력하세요"
          onChange={handleChangeTitle}
        />
      </div>
      <QuestionChoiceList items={items} isEdit/>
    </EditorQuestionContentBox>
  );
}

export default EditorQuestionContent;
