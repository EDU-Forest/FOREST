import { addWorkbook, setSelectWorkbook } from "@/stores/editor/editorWorkbook";
import { RootState } from "@/stores/store";
import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation } from "react-query";
import { useSelector, useDispatch } from "react-redux";

const fetcher = (title: string) =>
  // 예외적으로 "/" 포함
  workbookAxios.post("/workbook/", { title }).then(({ data }) => data);

const useAddWorkBook = () => {
  const dispatch = useDispatch();
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
