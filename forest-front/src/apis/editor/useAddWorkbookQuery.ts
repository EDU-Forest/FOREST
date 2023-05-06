import { addWorkbook, setSelectWorkbook, setWorkbookBySelf } from "@/stores/editor/editorWorkbook";
import { RootState } from "@/stores/store";
import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const fetcher = (title: string) =>
  workbookAxios.post("/api/workbook", { title }).then(({ data }) => data);

const useAddWorkBook = () => {
  const dispatch = useDispatch();
  const { workbooksBySelf } = useSelector((state: RootState) => state.editorWorkbook);
  return useMutation(fetcher, {
    onSuccess: (data) => {
      const { workbookId, title } = data.data;
      const payload = {
        workbookId,
        title,
      };
      dispatch(addWorkbook(payload));
      dispatch(setSelectWorkbook({ workbookId, title }));
    },
  });
};

export default useAddWorkBook;
