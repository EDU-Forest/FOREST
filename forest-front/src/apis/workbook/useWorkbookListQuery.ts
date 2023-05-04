import workbookAxios from "@/utils/workbookAxios";
import { useInfiniteQuery, useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (type: string) =>
  // const fetcher = (type: string, pageParam: number) =>
  workbookAxios.get("/api/workbook", { params: { search: type } }).then(({ data }) => {
    console.log(data);
    return data.data;
  });

const useWorkbookListQuery = (type: string) => {
  return useQuery([queryKeys.GET_WORKBOOK_LIST], () => fetcher(type), {
    refetchOnWindowFocus: false,
    // onSuccess: (data) => {
    //   console.log(data);
    // },
  });
  // return useInfiniteQuery(
  //   [queryKeys.GET_WORKBOOK_LIST, type],
  //   ({ pagePasram = 0 }) => fetcher(type, pageParam),
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
