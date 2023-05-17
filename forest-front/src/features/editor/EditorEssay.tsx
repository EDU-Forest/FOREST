import { setIsAnswerValidConfirm, setQuestions } from "@/stores/editor/editorQuestions";
import { RootState } from "@/stores/store";
import { QuestionType } from "@/types/Workbook";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClassInputMsg } from "../class/teacher/AddClassModal.style";
import { EditorEssayBox, EditorEssayKeywordsBox } from "./EditorQuestionContent.style";

interface IProps {
  question: QuestionType;
}

function EditorEssay({ question }: IProps) {
  const dispatch = useDispatch();

  const { questions } = useSelector((state: RootState) => state.editorQuestions);
  const { curQuestion } = useSelector((state: RootState) => state.editorQuestions);
  const { isAnswerValidConfirm } = useSelector((state: RootState) => state.editorQuestions);

  const [answers, setAnswers] = useState<string[]>([]);
  const maxAnswerLen = 100;
  const [isAnswerMaxValidConfirm, setIsAnswerMaxValidConfirm] = useState(true);

  useEffect(() => {
    question.answer ? setAnswers(question.answer.split(",")) : setAnswers([]);
  }, [question]);

  useEffect(() => {
    setIsAnswerMaxValidConfirm(answers.join(",").length < 100 ? true : false);
  }, [answers]);

  useEffect(() => {
    dispatch(
      setIsAnswerValidConfirm(
        isAnswerMaxValidConfirm && answers.join("").length !== 0 ? true : false,
      ),
    );
  }, [answers, isAnswerMaxValidConfirm]);

  const handleChangeAnswer = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const copyArr = [...answers];
    copyArr.splice(i, 1, e.target.value);
    setAnswers([...copyArr]);

    // 전체 배열에 반영
    const ansToSaveQuestions = [...copyArr].join(",");

    const copyQArr = [...questions];
    copyQArr.splice(curQuestion - 1, 1, {
      ...questions[curQuestion - 1],
      answer: ansToSaveQuestions,
    });

    dispatch(setQuestions([...copyQArr]));
  };
  const handleClickAddAnswer = () => {
    isAnswerMaxValidConfirm && setAnswers([...answers, ""]);
  };

  return (
    <EditorEssayBox>
      <p>채점 핵심 단어</p>
      <EditorEssayKeywordsBox>
        {answers.map((ans: string, i) => (
          <input
            key={`answer-input-${i}`}
            value={ans}
            placeholder="단어"
            onChange={(e) => handleChangeAnswer(i, e)}
          />
        ))}
        <button onClick={handleClickAddAnswer}>
          핵심 단어&nbsp;<span>+</span>
        </button>
      </EditorEssayKeywordsBox>
      {!isAnswerValidConfirm && <ClassInputMsg>채점 기준을 입력하세요</ClassInputMsg>}
    </EditorEssayBox>
  );
}

export default EditorEssay;
