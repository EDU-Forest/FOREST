import workbookAxios from "@/utils/workbookAxios";
import { useInfiniteQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (type: string, pageParam: number) =>
  workbookAxios
    .get("/api/workbook", { params: { sort: type, page: pageParam } })
    .then(({ data }) => data);

const useWorkbookListQuery = (type: string) => {
  return useInfiniteQuery(
    [queryKeys.GET_WORKBOOK_LIST, type],
    ({ pageParam = 0 }) => fetcher(type, pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.last ? undefined : lastPage.number + 1;
      },
      enabled: !!type,
      refetchOnWindowFocus: false,
    },
  );
};

export default useWorkbookListQuery;
