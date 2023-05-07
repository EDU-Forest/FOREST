import { useSelector } from "react-redux";
import { EditorQuestionListBox } from "./EditorQuestionList.style";
import { RootState } from "@/stores/store";
import EditorQuestionBar from "./EditorQuestionBar";

function EditorQuestionList() {
  const { questions } = useSelector((state: RootState) => state.editQuestions);

  return (
    <EditorQuestionListBox>
      <p>문제 ({questions.length})</p>
      {questions.map((question, i) => (
        <EditorQuestionBar key={`question-${i}`} question={question} num={i + 1}/>
      ))}
    </EditorQuestionListBox>
  );
}

export default EditorQuestionList;
