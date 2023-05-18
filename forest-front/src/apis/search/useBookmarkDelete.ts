import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (workbookId: number) => workbookAxios.delete(`/wb/bookmark/${workbookId}`);

// 문제집 북마크 해제 - OK
const useBookmarkDelete = (isWorkbookPage?: boolean) => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      if (isWorkbookPage) {
        queryClient.invalidateQueries(queryKeys.GET_WORKBOOK_DETAIL);
      } else {
        queryClient.invalidateQueries(queryKeys.RECENT_WORKBOOK_LIST);
        queryClient.invalidateQueries(queryKeys.POPULAR_WORKBOOK_LIST);
        queryClient.invalidateQueries(queryKeys.SEARCH_LIST);
      }
    },
  });
};

export default useBookmarkDelete;
