import { setQuestions } from "@/stores/editor/editorQuestions";
import { RootState } from "@/stores/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditorPointBox, EditorPointInput } from "./EditorQuestionContent.style";

interface IProps {
  curQuestion: number;
}

function EditorPoint({ curQuestion }: IProps) {
  const dispatch = useDispatch();

  const { questions } = useSelector((state: RootState) => state.editQuestions);

  const [point, setPoint] = useState<number>(0);

  useEffect(() => {
    setPoint(questions[curQuestion - 1]?.point);
  }, [questions, curQuestion]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoint(Number(e.target.value));

    const copyArr = [...questions];
    copyArr.splice(curQuestion - 1, 1, {
      ...questions[curQuestion - 1],
      point: Number(e.target.value),
    });

    dispatch(setQuestions([...copyArr]));
  };

  return (
    <EditorPointBox>
      <span>배점</span>
      <EditorPointInput value={point} onChange={handleChange} />
    </EditorPointBox>
  );
}

export default EditorPoint;
