import workbookAxios from "@/utils/workbookAxios";
import * as queryKeys from "@/constants/queryKeys";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { addWorkbook, setWorkbookBySelf } from "@/stores/editor/editorWorkbook";

const fetcher = () =>
  workbookAxios.get("/api/workbook/editor").then(({ data }) => {
    return data;
  });

const useGetWorkbooksBySelf = () => {
  const dispatch = useDispatch();
  return useQuery(queryKeys.WORKBOOKS_BY_SELF, () => fetcher(), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      dispatch(setWorkbookBySelf(data.data.workbookList));
    },
  });
};

export default useGetWorkbooksBySelf;
