import useEditor from "@/hooks/editor/useEditor";
import { QuestionType } from "@/types/Workbook";
import { useEffect, useState } from "react";
import {
  EditorQuestionImgAddedBox,
  EditorQuestionImgBox,
  EditorQuestionInputBox,
} from "./EditorQuestionContent.style";

interface IProps {
  question: QuestionType;
  curItem: number;
}

function EditorItemImg({ question, curItem }: IProps) {
  const [imgFile, setImgFile]: any = useState(null);
  const { toChangeItem } = useEditor();
  const eleId = `item-img-input-${curItem}`;

  const handleChange = (e: any) => {
    const file: any = e.target.files;

    if (file.length === 0) {
      return;
    } else {
      const {
        currentTarget: { files },
      } = e;

      const theFile = files[0];
      const reader = new FileReader();
      reader?.readAsDataURL(theFile);
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        }: any = finishedEvent;

        setImgFile(result);
        toChangeItem({ content: result }, curItem);
      };
    }
  };

  useEffect(() => {
    setImgFile(question.items[curItem - 1].content);
  }, [question.items]);

  return (
    <EditorQuestionImgBox>
      {imgFile ? (
        <EditorQuestionImgAddedBox>
          <img src={imgFile} alt="문제 이미지" />
          <input type="file" id={eleId} accept="image/*" onChange={handleChange} />
          <label htmlFor={eleId}>수정</label>
        </EditorQuestionImgAddedBox>
      ) : (
        <EditorQuestionInputBox as="div">
          <input type="file" id={eleId} accept="image/*" onChange={handleChange} />
          <label htmlFor={eleId}>이미지 삽입</label>
        </EditorQuestionInputBox>
      )}
    </EditorQuestionImgBox>
  );
}

export default EditorItemImg;
