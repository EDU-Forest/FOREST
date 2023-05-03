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

  const handleChange = (e: any) => {
    console.log(curItem);

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

        if (whereInserted === "question") {
          console.log('문제', curItem);
          toChangeQuestions(property, result);
        } else if (whereInserted === "item") {
          console.log('보기', curItem);
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
          <input type="file" id="img-input" accept="image/*" onChange={handleChange} />
          <label htmlFor="img-input">수정</label>
        </EditorQuestionImgAddedBox>
      ) : (
        <EditorQuestionInputBox as="div">
          <input type="file" id="img-input" accept="image/*" onChange={handleChange} />
          <label htmlFor="img-input" onClick={() => console.log(curItem)}>
            이미지 삽입
          </label>
        </EditorQuestionInputBox>
      )}
    </EditorQuestionImgBox>
  );
}

export default EditorQuestionImg;
