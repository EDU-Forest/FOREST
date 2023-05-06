import * as queryKeys from "@/constants/queryKeys";
import { setQuestions } from "@/stores/editor/editorQuestions";
import { setWorkbook } from "@/stores/workbookDetail/workbookDetail";
import workbookAxios from "@/utils/workbookAxios";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

const fetcher = async (wId: number) =>
  await workbookAxios.get(`/api/workbook/${wId}`).then(({ data }) => {
    return data.data;
  });

const useWorkbookDetailQuery = (wId: number) => {
  const dispatch = useDispatch();

  return useQuery([queryKeys.GET_WORKBOOK_DETAIL], () => fetcher(wId), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      dispatch(setWorkbook(data.workbookInfoDto));

      data.problemList.sort(function compare(a: any, b: any) {
        return a.problemNum - b.problemNum;
      });

      dispatch(setQuestions(data.problemList));
    },
    onError: (error) => {
      console.log("--useGetStudyInfoError --", error);
    },
  });
};

export default useWorkbookDetailQuery;