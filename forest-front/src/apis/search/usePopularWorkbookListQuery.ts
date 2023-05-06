import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import workbookAxios from "@/utils/customAxios/workbookAxios";

const fetcher = (type: string) =>
  workbookAxios
    .get("/api/workbook/best", {
      params: {
        search: type,
      },
    })
    .then(({ data }) => data.data);

// 탐색 페이지 최고 인기 문제집 - OK
const usePopularWorkbookListQuery = (type: string) => {
  return useQuery([queryKeys.POPULAR_WORKBOOK_LIST, type], () => fetcher(type), {
    refetchOnWindowFocus: false,
    enabled: !!type,
    onSuccess: (data) => {
      console.log("인기!", data);
    },
  });
};

export default usePopularWorkbookListQuery;
