import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import workbookAxios from "@/utils/customAxios/workbookAxios";
import { ISearchWorkbook } from "@/types/Workbook";

const fetcher = () =>
  workbookAxios.get("/workbook/recent").then(({ data }) => {
    const recentList = data.data.workbookList as ISearchWorkbook[];
    return recentList;
  });

// 탐색 페이지 최신 등록 문제집 - OK
const useRecentWorkbookListQuery = () => {
  return useQuery([queryKeys.RECENT_WORKBOOK_LIST], fetcher, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {},
  });
};

export default useRecentWorkbookListQuery;
