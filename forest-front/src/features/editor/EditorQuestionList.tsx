import { useSelector } from "react-redux";
import { EditorQuestionListBox } from "./EditorQuestionList.style";
import { RootState } from "@/stores/store";

function EditorQuestionList() {
  const { questions } = useSelector((state: RootState) => state.editQuestions);

  return (
    <EditorQuestionListBox>
      <p>문제 ({questions.length})</p>
    </EditorQuestionListBox>
  );
}

export default EditorQuestionList;
