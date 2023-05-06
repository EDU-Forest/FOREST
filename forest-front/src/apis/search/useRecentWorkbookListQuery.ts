import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import workbookAxios from "@/utils/customAxios/workbookAxios";

const fetcher = () => workbookAxios.get("/api/workbook/recent").then(({ data }) => data.data);

// 탐색 페이지 최신 등록 문제집 - OK
const useRecentWorkbookListQuery = () => {
  return useQuery([queryKeys.RECENT_WORKBOOK_LIST], fetcher, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log("최신!", data);
    },
  });
};

export default useRecentWorkbookListQuery;
