import { setIsPointValidConfirm, setQuestions } from "@/stores/editor/editorQuestions";
import { RootState } from "@/stores/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClassInputMsg } from "../class/teacher/AddClassModal.style";
import { EditorPointBox, EditorPointInput } from "./EditorQuestionContent.style";

interface IProps {
  curQuestion: number;
}

function EditorPoint({ curQuestion }: IProps) {
  const dispatch = useDispatch();

  const { questions } = useSelector((state: RootState) => state.editorQuestions);
  const { isPointValidConfirm } = useSelector((state: RootState) => state.editorQuestions);

  const [point, setPoint] = useState<number>(0);

  useEffect(() => {
    setPoint(questions[curQuestion - 1]?.point);
  }, [questions, curQuestion]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let numberScore = parseInt(value.replace(/[^0-9]/g, ""));

    setPoint(numberScore);

    const copyArr = [...questions];
    copyArr.splice(curQuestion - 1, 1, {
      ...questions[curQuestion - 1],
      point: isNaN(numberScore) ? 0 : numberScore,
    });

    dispatch(setQuestions([...copyArr]));
  };

  useEffect(() => {
    dispatch(setIsPointValidConfirm(point || Number(point) !== 0 ? true : false));
  }, [point]);

  return (
    <div>
      {!isPointValidConfirm && <ClassInputMsg>배점을 입력하세요</ClassInputMsg>}
      <EditorPointBox>
        <span>배점</span>
        <EditorPointInput value={point} onChange={handleChange} />
      </EditorPointBox>
    </div>
  );
}

export default EditorPoint;
