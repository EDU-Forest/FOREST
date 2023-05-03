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

  const toChangeItem = (property: string, value: any, curItem: number) => {
    // 1. items: question의 보기
    // 2. 1을 question에 합치기
    // 3. 2를 questions에 splice

    const copyItemsArr = [...questions[curQuestion - 1].items];
    copyItemsArr.splice(curItem - 1, 1, {
      ...copyItemsArr[curItem - 1],
      [property]: value,
    });

    toChangeQuestions("items", copyItemsArr);
  };

  return { toChangeQuestions, toChangeItem };
}

export default useEditor;
