import * as queryKeys from "@/constants/queryKeys";
import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useQuery } from "react-query";

const fetcher = (type: string, page: number, size: number) =>
  workbookAxios
    // 예외적으로 "/" 포함
    .get("/workbook/", { params: { search: type, page: page, size: size } })
    .then(({ data }) => {
      return data.data;
    });

const useWorkbookListQuery = (type: string, page: number, size: number) => {
  return useQuery([queryKeys.GET_WORKBOOK_LIST], () => fetcher(type, page, size), {
    enabled: (type === "like" || type === "use" || type === "own") && !!page && !!size,
    refetchOnWindowFocus: false,
  });
};

export default useWorkbookListQuery;
