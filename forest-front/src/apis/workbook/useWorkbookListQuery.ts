import * as queryKeys from "@/constants/queryKeys";
import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useQuery } from "react-query";

const fetcher = (type: string, page: number, size: number) =>
  // 용량 에러였다..
  workbookAxios
    .get("/workbook/teacher", { params: { search: type, page: page, size: size } })
    .then(({ data }) => {
      return data.data;
    });

const useWorkbookListQuery = (type: string, page: number, size: number) => {
  return useQuery([queryKeys.GET_WORKBOOK_LIST], () => fetcher(type, page, size), {
    refetchOnWindowFocus: false,
  });
};

export default useWorkbookListQuery;
