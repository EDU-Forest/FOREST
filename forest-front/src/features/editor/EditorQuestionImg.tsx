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
  property: string;
  whereInserted: string;
  curItem?: number;
}

function EditorQuestionImg({ question, property, whereInserted, curItem }: IProps) {
  const [imgFile, setImgFile]: any = useState(null);
  const { toChangeQuestions, toChangeItem } = useEditor();

  const handleChange = (e: any, curItem: any) => {
    console.log(curItem);

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

        if (whereInserted === "question") {
          toChangeQuestions(property, result);
        } else if (whereInserted === "item") {
          console.log(curItem);
          curItem && toChangeItem({ [property]: result }, curItem);
        }
      };
    }
  };

  useEffect(() => {
    console.log("***", curItem);
  }, [curItem]);

  useEffect(() => {
    if (whereInserted === "question") {
      setImgFile(question.problemImgPath);
    } else if (whereInserted === "item") {
      curItem && setImgFile(question.items[curItem - 1].content);
    }
  }, [question]);
  // }, [question.problemImgPath, curItem, curItem && question.items[curItem - 1].content]);

  return (
    <EditorQuestionImgBox>
      {imgFile ? (
        <EditorQuestionImgAddedBox>
          <img src={imgFile} alt="문제 이미지" />
          <input
            type="file"
            id="img-input"
            accept="image/*"
            onChange={(e) => handleChange(e, curItem)}
          />
          <label htmlFor="img-input">수정</label>
        </EditorQuestionImgAddedBox>
      ) : (
        <EditorQuestionInputBox as="div">
          <input
            type="file"
            id="img-input"
            accept="image/*"
            onChange={(e) => handleChange(e, curItem)}
          />
          <label htmlFor="img-input" onClick={() => console.log(curItem)}>
            이미지 삽입
          </label>
        </EditorQuestionInputBox>
      )}
    </EditorQuestionImgBox>
  );
}

export default EditorQuestionImg;
