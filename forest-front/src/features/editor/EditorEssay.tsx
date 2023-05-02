import { RootState } from "@/stores/store";
import { QuestionType } from "@/types/Workbook";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EditorEssayBox, EditorEssayKeywordsBox } from "./EditorQuestionContent.style";
import { setQuestions } from "@/stores/editor/editorQuestions";
import { useDispatch } from "react-redux";

interface IProps {
  question: QuestionType;
}

function EditorEssay({ question }: IProps) {
  const dispatch = useDispatch();

  const { questions } = useSelector((state: RootState) => state.editQuestions);
  const { curQuestion } = useSelector((state: RootState) => state.editQuestions);

  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    question.answer && setAnswers(question.answer.split(","));
  }, [question]);

  const handleChangeAnswer = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const copyArr = [...answers];
    copyArr.splice(i, 1, e.target.value);
    setAnswers([...copyArr]);

    // 전체 배열에 반영
    const ansToSaveQuestions = [...copyArr].join(",");
    console.log(ansToSaveQuestions);

    const copyQArr = [...questions];
    copyQArr.splice(curQuestion - 1, 1, {
      ...questions[curQuestion - 1],
      answer: ansToSaveQuestions,
    });

    dispatch(setQuestions([...copyQArr]));
  };
  const handleClickAddAnswer = () => {
    setAnswers([...answers, ""]);
  };

  return (
    <EditorEssayBox>
      <p>채점 핵심 단어</p>
      <EditorEssayKeywordsBox>
        {answers.map((ans: string, i) => (
          <input
            key={i}
            value={ans}
            placeholder="단어"
            onChange={(e) => handleChangeAnswer(i, e)}
          />
        ))}
        <button onClick={handleClickAddAnswer}>
          핵심 단어&nbsp;<span>+</span>
        </button>
      </EditorEssayKeywordsBox>
    </EditorEssayBox>
  );
}

export default EditorEssay;
