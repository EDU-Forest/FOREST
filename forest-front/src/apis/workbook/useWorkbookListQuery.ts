import * as queryKeys from "@/constants/queryKeys";
import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useQuery } from "react-query";

const fetcher = (type: string, page: number, size: number) =>
  workbookAxios
    .get("/workbook", { params: { search: type, page: page, size: size } })
    .then(({ data }) => {
      return data.data;
    });

const useWorkbookListQuery = (type: string, page: number, size: number) => {
  return useQuery([queryKeys.GET_WORKBOOK_LIST], () => fetcher(type, page, size), {
    refetchOnWindowFocus: false,
  });
  // return useInfiniteQuery(
  //   [queryKeys.GET_WORKBOOK_LIST, type],
  //   ({ pageParam = 0 }) => fetcher(type, pageParam),
  //   {
  //     getNextPageParam: (lastPage, pages) => {
  //       return lastPage.last ? undefined : lastPage.number + 1;
  //     },
  //     enabled: !!type,
  //     refetchOnWindowFocus: false,
  //   },
  // );
};

export default useWorkbookListQuery;
