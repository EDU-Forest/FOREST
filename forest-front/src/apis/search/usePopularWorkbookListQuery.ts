import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import workbookAxios from "@/utils/workbookAxios";

const fetcher = (type: string) =>
  workbookAxios
    .get("/api/workbook/best", {
      params: {
        search: type,
      },
    })
    .then(({ data }) => data);

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
