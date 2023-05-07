import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import workbookAxios from "@/utils/customAxios/workbookAxios";

const fetcher = (keyword: string) =>
  workbookAxios
    .get("/api/workbook/explore", { params: { search: keyword } })
    .then(({ data }) => data.data);

// 탐색페이지 검색 API - OK
const useSearchWorkbookQuery = (keyword: string) => {
  return useQuery([queryKeys.SEARCH_LIST, keyword], () => fetcher(keyword), {
    refetchOnWindowFocus: false,
    enabled: !!keyword,
    onSuccess: (data) => {
      console.log("검색 성공", data);
    },
  });
};

export default useSearchWorkbookQuery;