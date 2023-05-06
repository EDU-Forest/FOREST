import workbookAxios from "@/utils/workbookAxios";
import * as queryKeys from "@/constants/queryKeys";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { addWorkbook, setSelectWorkbook, setWorkbookBySelf } from "@/stores/editor/editorWorkbook";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { resetIsMoveToEditor, setIsMoveToEditor } from "@/stores/workbookDetail/workbookDetail";

const fetcher = () =>
  workbookAxios.get("/api/workbook/editor").then(({ data }) => {
    return data;
  });

const useGetWorkbooksBySelf = () => {
  const dispatch = useDispatch();
  const { isMoveToEditor } = useSelector((state: RootState) => state.workbookDetail);

  return useQuery(queryKeys.WORKBOOKS_BY_SELF, () => fetcher(), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      dispatch(setWorkbookBySelf(data?.data?.workbookList));

      if (!isMoveToEditor) {
        dispatch(
          setSelectWorkbook({
            workbookId: data?.data?.workbookList[0].workbookId,
            title: data?.data?.workbookList[0].title,
          }),
        );
      }

      dispatch(resetIsMoveToEditor());
    },
  });
};

export default useGetWorkbooksBySelf;
