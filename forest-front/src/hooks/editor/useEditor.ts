import { setQuestions } from "@/stores/editor/editorQuestions";
import { RootState } from "@/stores/store";
import { useDispatch, useSelector } from "react-redux";

interface IItem {
  isImage?: boolean;
  content?: string | any;
}

function useEditor() {
  const dispatch = useDispatch();
  const { questions } = useSelector((state: RootState) => state.editQuestions);
  const { curQuestion } = useSelector((state: RootState) => state.editQuestions);

  const toChangeQuestions = (key: string, value: any) => {
    const copyArr = [...questions];
    copyArr.splice(curQuestion - 1, 1, {
      ...questions[curQuestion - 1],
      [key]: value,
    });

    dispatch(setQuestions([...copyArr]));
  };

  const toChangeItem = (payload: IItem, curItem: number) => {
    const copyItemsArr = [...questions[curQuestion - 1].itemList];
    copyItemsArr.splice(curItem - 1, 1, {
      ...copyItemsArr[curItem - 1],
      ...payload,
    });

    toChangeQuestions("items", copyItemsArr);
  };

  return { toChangeQuestions, toChangeItem };
}

export default useEditor;
