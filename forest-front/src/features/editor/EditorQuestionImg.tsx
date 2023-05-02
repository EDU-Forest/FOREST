import useEditor from "@/hooks/editor/useEditor";
import { RootState } from "@/stores/store";
import { QuestionType } from "@/types/Workbook";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  EditorQuestionImgBox,
  EditorQuestionImgBtn,
  EditorQuestionInputBox,
  EditorQuestionItemAddButton,
} from "./EditorQuestionContent.style";

interface IProps {
  question: QuestionType;
}

function EditorQuestionImg({ question }: IProps) {
  const [imgFile, setImgFile]: any = useState(null);
  const [toChangeQuestions] = useEditor();

  const handleChange = (e: any) => {
    const file: any = e.target.files; // 이부분을 추가함 if Else를 넣어줌
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
    setImgFile(question.problemImgPath);
  }, [question.problemImgPath]);

  return (
    <EditorQuestionImgBox>
      {imgFile ? (
        <>
          <img src={imgFile && imgFile} alt="문제 이미지" />
          <input type="file" id="img-input" accept="image/*" onChange={handleChange} />
          <label htmlFor="img-input">이미지 삽입</label>
        </>
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
