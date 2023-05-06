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
}

function EditorQuestionImg({ question }: IProps) {
  const [imgFile, setImgFile]: any = useState(null);
  const { toChangeQuestions } = useEditor();

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
        toChangeQuestions("problemImgPath", result);
      };
    }
  };

  useEffect(() => {
    setImgFile(question?.problemImgPath);
  }, [question?.problemImgPath]);

  return (
    <EditorQuestionImgBox>
      {imgFile ? (
        <EditorQuestionImgAddedBox>
          <img src={imgFile} alt="문제 이미지" />
          <input type="file" id="img-input" accept="image/*" onChange={handleChange} />
          <label htmlFor="img-input">수정</label>
        </EditorQuestionImgAddedBox>
      ) : (
        <EditorQuestionInputBox as="div">
          <input type="file" id="img-input" accept="image/*" onChange={handleChange} />
          <label htmlFor="img-input">이미지 삽입</label>
        </EditorQuestionInputBox>
      )}
    </EditorQuestionImgBox>
  );
}

export default EditorQuestionImg;
