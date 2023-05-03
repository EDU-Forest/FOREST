import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import workbookAxios from "@/utils/workbookAxios";

const fetcher = () => workbookAxios.get("/api/workbook/recent").then(({ data }) => data.data);

const useRecentWorkbookListQuery = () => {
  return useQuery([queryKeys.RECENT_WORKBOOK_LIST], fetcher, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log("최신!", data);
    },
  });
};

export default useRecentWorkbookListQuery;
