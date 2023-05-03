import useEditor from "@/hooks/editor/useEditor";
import { RootState } from "@/stores/store";
import { QuestionType } from "@/types/Workbook";
import { useCallback, useEffect, useState } from "react";
import { BiText } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { EditorItemToggleBtnBox } from "./EditorQuestionContent.style";

interface IProps {
  isCorrect: boolean;
  question: QuestionType;
  curItem: number; // 현재 보기
}

function EditorItemToggleBtn({ isCorrect, question, curItem }: IProps) {
  const dispatch = useDispatch();

  const { toChangeItems } = useEditor();
  const { questions } = useSelector((state: RootState) => state.editQuestions);
  const { curQuestion } = useSelector((state: RootState) => state.editQuestions);

  // 1 -> 텍스트 선택
  // 2 -> 이미지 선택
  const [selected, setSelected] = useState(1);

  const changeItems = useCallback(
    (type: number) => {
      if (type === 1) {
        toChangeItems("isImage", false, curItem);
      } else if (type === 2) {
        toChangeItems("isImage", true, curItem);
      }
    },
    [selected],
  );

  const handleClickToggle = (type: number) => {
    setSelected(type);

    changeItems(type);
  };

  useEffect(() => {
    setSelected(question.items[curItem - 1].isImage ? 2 : 1);
    console.log(questions);
  }, [question.items[curItem - 1].isImage]);

  useEffect(() => {}, [questions]);

  return (
    <EditorItemToggleBtnBox isCorrect={isCorrect} selected={selected}>
      <div onClick={() => handleClickToggle(1)}>
        <BiText />
      </div>
      <div onClick={() => handleClickToggle(2)}>
        <BsImage />
      </div>
    </EditorItemToggleBtnBox>
  );
}

export default EditorItemToggleBtn;