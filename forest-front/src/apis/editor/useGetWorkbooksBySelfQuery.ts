import workbookAxios from "@/utils/customAxios/workbookAxios";
import * as queryKeys from "@/constants/queryKeys";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { addWorkbook, setSelectWorkbook, setWorkbookBySelf } from "@/stores/editor/editorWorkbook";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { resetIsMoveToEditor, setIsMoveToEditor } from "@/stores/workbookDetail/workbookDetail";

interface Iprops {
  workbookId: number;
  title: string;
  isDeploy: boolean;
  isExecute: boolean;
}

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
      const workbookList = data?.data?.workbookList.filter(
        (item: Iprops) => !item.isDeploy && !item.isExecute,
      );
      dispatch(setWorkbookBySelf(workbookList));

      if (!isMoveToEditor) {
        dispatch(
          setSelectWorkbook({
            workbookId: workbookList.length > 0 ? workbookList[0].workbookId : -1,
            title: workbookList.length > 0 ? workbookList[0].title : "",
          }),
        );
      }

      dispatch(resetIsMoveToEditor());
    },
  });
};

export default useGetWorkbooksBySelf;
