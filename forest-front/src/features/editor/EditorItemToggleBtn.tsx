import useEditor from "@/hooks/editor/useEditor";
import { RootState } from "@/stores/store";
import { QuestionType } from "@/types/Workbook";
import { useEffect, useState } from "react";
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

  const { toChangeItem } = useEditor();
  const { questions } = useSelector((state: RootState) => state.editQuestions);
  const { curQuestion } = useSelector((state: RootState) => state.editQuestions);

  // 1 -> 텍스트 선택
  // 2 -> 이미지 선택
  const [selected, setSelected] = useState(1);

  const switchItemType = (type: number) => {
    // 변경된 타입을 전체 배열에 반영하고,
    // 타입이 변할 때마다 보기의 내용을 초기화
    if (type === 1) {
      toChangeItem({ isImage: false, content: "" }, curItem);
    } else if (type === 2) {
      toChangeItem({ isImage: true, content: "" }, curItem);
    }
  };

  const handleClickToggle = (type: number) => {
    // 현재의 타입과 다른 타입을 클릭했을 때만 동작
    if (selected !== type) {
      setSelected(type);
      switchItemType(type);
    }
  };

  useEffect(() => {
    setSelected(question.items[curItem - 1]?.isImage ? 2 : 1);
  }, [question.items[curItem - 1]?.isImage]);

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
