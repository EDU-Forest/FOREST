import { setQuestions } from "@/stores/editor/editorQuestions";
import { RootState } from "@/stores/store";
import { QuestionType } from "@/types/Workbook";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditorEssay from "./EditorEssay";
import EditorMultipleChoice from "./EditorMultipleChoice";
import EditorOX from "./EditorOX";
import EditorPoint from "./EditorPoint";
import {
  EditorNumAndPointBox,
  EditorQuestionContentBox,
  EditorQuestionNumbox,
  EditorQuestionTitleInput,
} from "./EditorQuestionContent.style";
import EditorShortAnswer from "./EditorShortAnswer";

interface IProps {
  selectQuestionType: string;
}

function EditorQuestionContent({ selectQuestionType }: IProps) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState<QuestionType>({
    id: 0,
    problemNum: 0,
    type: "multipleChoice",
    title: "",
    text: "",
    answer: "1",
    point: 0,
    problemImgPath: "",
    items: [],
  });

  const { questions } = useSelector((state: RootState) => state.editQuestions);
  // 현재 문항 번호
  const { curQuestion } = useSelector((state: RootState) => state.editQuestions);

  useEffect(() => {
    // view 할 문항이 바뀌거나, 현재 문항에 변동이 있을 경우에만
    setQuestion(questions[curQuestion - 1]);
  }, [curQuestion, questions[curQuestion - 1]]);

  useEffect(() => {
    // 현재 문항의 타이틀이 변경되면 타이틀을 초기화 또는 변경
    setTitle(question.title);
  }, [question.title]);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);

    // 변경된 제목을 questions(전체 문제 배열)에 반영
    const copyArr = [...questions];
    copyArr.splice(curQuestion - 1, 1, {
      ...questions[curQuestion - 1],
      title: e.target.value,
    });

    dispatch(setQuestions([...copyArr]));
  };

  return (
    <>
      <EditorNumAndPointBox>
        <EditorQuestionNumbox>{curQuestion}</EditorQuestionNumbox>
        <EditorPoint curQuestion={curQuestion} />
      </EditorNumAndPointBox>

      <EditorQuestionContentBox>
        <div>
          <EditorQuestionTitleInput
            value={title}
            placeholder="문제를 입력하세요"
            onChange={handleChangeTitle}
          />
        </div>
        {/* 객관식 */}
        {question.type === "multipleChoice" && (
          <EditorMultipleChoice
            question={question}
            curQuestion={curQuestion}
          ></EditorMultipleChoice>
        )}
        {/* ox */}
        {question.type === "oxChoice" && <EditorOX question={question} curQuestion={curQuestion} />}
        {/* 단답식 */}
        {question.type === "shortAnswer" && <EditorShortAnswer />}
        {/* 서술형 */}
        {question.type === "essay" && <EditorEssay question={question} />}
      </EditorQuestionContentBox>
    </>
  );
}

export default EditorQuestionContent;
