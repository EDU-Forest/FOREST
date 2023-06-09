import * as queryKeys from "@/constants/queryKeys";
import { setQuestions } from "@/stores/editor/editorQuestions";
import { setWorkbook } from "@/stores/workbookDetail/workbookDetail";
import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

const fetcher = async (wId: number) =>
  await workbookAxios.get(`/wb/${wId}`).then(({ data }) => {
    return data.data;
  });

const useWorkbookDetailQuery = (wId: number) => {
  const dispatch = useDispatch();

  return useQuery([queryKeys.GET_WORKBOOK_DETAIL, wId], () => fetcher(wId), {
    enabled: !!wId && wId !== -1,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      dispatch(setWorkbook(data.workbookInfo));
      const problemList = data.problemList.slice().sort(function compare(a: any, b: any) {
        return a.problemNum - b.problemNum;
      });

      dispatch(setQuestions(problemList));
    },
    onError: (error) => {},
  });
};

export default useWorkbookDetailQuery;
