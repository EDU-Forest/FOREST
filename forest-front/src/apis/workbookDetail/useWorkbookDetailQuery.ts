import * as queryKeys from "@/constants/queryKeys";
import workbookAxios from "@/utils/workbookAxios";
import { useQuery } from "react-query";

const fetcher = async(wId: number) =>
  await workbookAxios.get(`/api/workbook/${wId}`).then(({ data }) => {
    return data.data;
  });

const useWorkbookDetailQuery = (wId: number) => {
  return useQuery([queryKeys.GET_WORKBOOK_DETAIL], () => fetcher(wId), {
    refetchOnWindowFocus: false,
  });
};

export default useWorkbookDetailQuery;
