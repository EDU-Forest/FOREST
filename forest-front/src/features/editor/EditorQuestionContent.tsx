import { RootState } from "@/stores/store";
import { QuestionItemType, QuestionType } from "@/types/Workbook";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditorQuestionChoiceList from "./EditorQuestionChoiceList";
import {
  EditorQuestionContentBox,
  EditorQuestionItemAddButton,
  EditorQuestionNumbox,
  EditorQuestionTitleInput,
} from "./EditorQuestionContent.style";
import EditorMultipleChoice from "./EditorMultipleChoice";
import EditorShortAnswer from "./EditorShortAnswer";

interface IProps {
  selectQuestionType: string;
}

function EditorQuestionContent({ selectQuestionType }: IProps) {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState<QuestionType>({
    id: 0,
    problemNum: 0,
    type: "multipleChoice",
    title: "",
    text: "",
    point: 0,
    image: "",
    items: [],
  });

  const { questions } = useSelector((state: RootState) => state.editQuestions);
  // 현재 문항 번호
  const { curQuestion } = useSelector((state: RootState) => state.editQuestions);

  useEffect(() => {
    setQuestion(questions[curQuestion - 1]);
  }, [curQuestion]);

  useEffect(() => {
    setTitle(question.title);
  }, [question]);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <>
      <EditorQuestionNumbox>{curQuestion}</EditorQuestionNumbox>
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
          <EditorMultipleChoice question={question}></EditorMultipleChoice>
        )}
        {/* 단답식 */}
        {question.type === "shortAnswer" && <EditorShortAnswer />}
      </EditorQuestionContentBox>
    </>
  );
}

export default EditorQuestionContent;
