import * as queryKeys from "@/constants/queryKeys";
import { setQuestions } from "@/stores/editor/editorQuestions";
import { setWorkbook } from "@/stores/workbookDetail/workbookDetail";
import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

const fetcher = async () =>
  await workbookAxios.get(`/api/workbook/img`).then(({ data }) => {
    return data.data;
  });

const useWorkbookDetailImgQuery = () => {
  return useQuery([queryKeys.GET_WORKBOOK_IMGS], fetcher, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log("이미지 get 완료", data);
      return data;
    },
    onError: (error) => {
      console.log("--useGetStudyInfoError --", error);
    },
  });
};

export default useWorkbookDetailImgQuery;
