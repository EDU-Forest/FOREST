import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import workbookAxios from "@/utils/customAxios/workbookAxios";
import { ISearchWorkbook } from "@/types/Workbook";

const fetcher = (type: string) =>
  workbookAxios
    .get("/workbook/best", {
      params: {
        search: type,
      },
    })
    .then(({ data }) => {
      const popularList = data.data.workbookList as ISearchWorkbook[];
      return popularList;
    });

// 탐색 페이지 최고 인기 문제집 - OK
const usePopularWorkbookListQuery = (type: string) => {
  return useQuery([queryKeys.POPULAR_WORKBOOK_LIST, type], () => fetcher(type), {
    refetchOnWindowFocus: false,
    enabled: !!type,
    onSuccess: (data) => {},
  });
};

export default usePopularWorkbookListQuery;
