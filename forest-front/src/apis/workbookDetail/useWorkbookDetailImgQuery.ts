import * as queryKeys from "@/constants/queryKeys";
import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useQuery } from "react-query";

const fetcher = async () =>
  await workbookAxios.get(`/wb/img`).then(({ data }) => {
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
