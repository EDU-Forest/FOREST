import useEditor from "@/hooks/editor/useEditor";
import { QuestionType } from "@/types/Workbook";
import { useEffect, useState } from "react";
import {
  EditorQuestionImgAddedBox,
  EditorQuestionImgBox,
  EditorQuestionInputBox,
} from "./EditorQuestionContent.style";
import useWorkbookImgPost from "@/apis/editor/useWorkbookImgPost";

interface IProps {
  question: QuestionType;
}

function EditorQuestionImg({ question }: IProps) {
  // 이미지 프리뷰
  const [imgFile, setImgFile]: any = useState(null);
  const { toChangeQuestions } = useEditor();
  const { data: res, mutate: imgPostApi } = useWorkbookImgPost();

  const changePreviewImg = (e: any, file: any) => {
    const reader = new FileReader();
    reader?.readAsDataURL(file);
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      }: any = finishedEvent;

      setImgFile(result);
    };
  };

  const imgPostApiCall = (file: any) => {
    // 백으로 보내기 위해 form에 이미지 담기
    const formData = new FormData();
    formData.append("file", file);

    // 백으로 보낼 이미지 경로 받기 위한 post 요청
    imgPostApi(formData);
  };

  const handleChange = (e: any) => {
    const file: any = e.target.files;

    if (file.length !== 0) {
      const {
        currentTarget: { files },
      } = e;

      const theFile = files[0];

      changePreviewImg(e, theFile);
      imgPostApiCall(theFile);
    }
  };

  useEffect(() => {
    // 응답 받은 이미지 경로를 전체 배열에 저장
    // 첫 로딩 때가 아니라, 응답을 받았을 때만 로직을 수행하기 위한 and 연산
    res && toChangeQuestions("problemImgPath", res?.data?.path);
  }, [res]);

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
