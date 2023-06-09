import useSaveEditedWorkbookPost from "@/apis/editor/useSaveEditedWorkbookPost";
import { RootState } from "@/stores/store";
import { QuestionType } from "@/types/Workbook";
import { useSelector } from "react-redux";

function useEditorSave() {
  const { questions } = useSelector((state: RootState) => state.editorQuestions);
  const { deleteAnswers } = useSelector((state: RootState) => state.editorQuestions);
  const { data: res, mutate: saveApi, isLoading, isSuccess } = useSaveEditedWorkbookPost();
  const { curWorkbookId } = useSelector((state: RootState) => state.editorWorkbook);

  const workbookId: string = curWorkbookId?.toString();

  const problemList = questions.map((question: QuestionType, i) => {
    return {
      problemNo: i + 1,
      problemId: question.problemId !== 0 ? question.problemId : null,
      type: question.type,
      title: question.title,
      path: question.problemImgPath === null ? "" : question.problemImgPath,
      text: question.text,
      answer: question.answer,
      point: question.point,
      itemList: question.itemList
        ? question.itemList.map((item, i) => {
            return {
              itemNo: i + 1,
              content: item.content,
              isImage: item.isImage,
            };
          })
        : [],
    };
  });

  const deleteItemList = deleteAnswers
    ? deleteAnswers.map((answer, i) => {
        return {
          itemId: answer,
        };
      })
    : [];

  const data = {
    workbookId,
    problemList,
    deleteItemList,
  };

  const editorSave = () => {
    saveApi(data);
  };

  return { editorSave, isLoading, isSuccess };
}

export default useEditorSave;
