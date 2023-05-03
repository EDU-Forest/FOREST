import { setQuestions } from "@/stores/editor/editorQuestions";
import { RootState } from "@/stores/store";
import { useDispatch, useSelector } from "react-redux";

function useEditor() {
  const dispatch = useDispatch();
  const { questions } = useSelector((state: RootState) => state.editQuestions);
  const { curQuestion } = useSelector((state: RootState) => state.editQuestions);

  const toChangeQuestions = (property: string, value: any) => {
    const copyArr = [...questions];
    copyArr.splice(curQuestion - 1, 1, {
      ...questions[curQuestion - 1],
      [property]: value,
    });

    dispatch(setQuestions([...copyArr]));
  };

  const toChangeItems = (property: string, value: any, curItem: number) => {
    // 1. items: question의 보기
    // 2. 1을 question에 합치기
    // 3. 2를 questions에 splice

    const copyItmesArr = [...questions[curQuestion - 1].items];
    copyItmesArr.splice(curItem - 1, 1, {
      ...copyItmesArr[curItem - 1],
      [property]: value,
    });

    toChangeQuestions("items", copyItmesArr);
  };

  return { toChangeQuestions, toChangeItems };
}

export default useEditor;
