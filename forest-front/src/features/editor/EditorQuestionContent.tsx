import { setIsTitleValidConfirm, setQuestions } from "@/stores/editor/editorQuestions";
import { RootState } from "@/stores/store";
import { QuestionType } from "@/types/Workbook";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClassInputMsg } from "../class/teacher/AddClassModal.style";
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
import EditorQuestionImg from "./EditorQuestionImg";
import EditorQuestionTextInput from "./EditorQuestionText";
import EditorShortAnswer from "./EditorShortAnswer";

interface IProps {
  selectQuestionType: string;
}

function EditorQuestionContent({ selectQuestionType }: IProps) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState<QuestionType>({
    problemId: 0,
    problemNum: 0,
    type: "MULTIPLE",
    title: "",
    text: "",
    answer: "1",
    point: 0,
    problemImgPath: "",
    imgIsEmpty: false,
    textIsEmpty: false,
    itemList: [],
  });

  const { questions } = useSelector((state: RootState) => state.editorQuestions);
  // 현재 문항 번호
  const { curQuestion } = useSelector((state: RootState) => state.editorQuestions);
  const { isTitleValidConfirm } = useSelector((state: RootState) => state.editorQuestions);
  const { isPointValidConfirm } = useSelector((state: RootState) => state.editorQuestions);

  useEffect(() => {
    // view 할 문항이 바뀌거나, 현재 문항에 변동이 있을 경우에만
    setQuestion(questions[curQuestion - 1]);
  }, [curQuestion, questions[curQuestion - 1]]);

  useEffect(() => {
    // 현재 문항의 타이틀이 변경되면 타이틀을 초기화 또는 변경
    setTitle(question?.title);
    dispatch(setIsTitleValidConfirm(question?.title ? true : false));
  }, [question?.title]);

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
        <EditorQuestionTitleInput
          value={title}
          placeholder="문제를 입력하세요"
          onChange={handleChangeTitle}
        />
        {!isTitleValidConfirm && <ClassInputMsg>문제를 입력하세요</ClassInputMsg>}
        {/* 지문 여부에 따라 지문 렌더링 */}
        {!question?.textIsEmpty && <EditorQuestionTextInput question={question} />}
        {/* 이미지 여부에 따라 이미지 렌더링 */}
        {!question?.imgIsEmpty && <EditorQuestionImg question={question} />}
        {/* 객관식 */}
        {question?.type === "MULTIPLE" && question.itemList && (
          <EditorMultipleChoice
            question={question}
            curQuestion={curQuestion}
          ></EditorMultipleChoice>
        )}
        {/* ox */}
        {question?.type === "OX" && <EditorOX question={question} curQuestion={curQuestion} />}
        {/* 단답식 */}
        {question?.type === "SUBJECTIVE" && <EditorShortAnswer />}
        {/* 서술형 */}
        {question?.type === "DESCRIPT" && <EditorEssay question={question} />}
      </EditorQuestionContentBox>
    </>
  );
}

export default EditorQuestionContent;
