import { useSelector } from "react-redux";
import { EditorQuestionListBox } from "./EditorQuestionList.style";
import { RootState } from "@/stores/store";
import EditorQuestionBar from "./EditorQuestionBar";

function EditorQuestionList() {
  const { questions } = useSelector((state: RootState) => state.editQuestions);

  return (
    <EditorQuestionListBox>
      <p>문제 ({questions.length})</p>
      {questions.length !== 0 ? (
        questions.map((question, i) => (
          <EditorQuestionBar key={`question-${i}`} question={question} num={i + 1} />
        ))
      ) : (
        <span>문항이 없습니다</span>
      )}
    </EditorQuestionListBox>
  );
}

export default EditorQuestionList;
