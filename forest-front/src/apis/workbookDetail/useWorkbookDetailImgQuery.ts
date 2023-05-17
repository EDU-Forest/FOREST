import * as queryKeys from "@/constants/queryKeys";
import { setQuestions } from "@/stores/editor/editorQuestions";
import { setWorkbook } from "@/stores/workbookDetail/workbookDetail";
import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

const fetcher = async () =>
  await workbookAxios.get(`/workbook/img`).then(({ data }) => {
    return data.data;
  });

const useWorkbookDetailImgQuery = () => {
  return useQuery([queryKeys.GET_WORKBOOK_IMGS], fetcher, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {},
  });
};

export default useWorkbookDetailImgQuery;
