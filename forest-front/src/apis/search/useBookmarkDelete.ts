import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (workbookId: number) =>
  workbookAxios.delete(`/api/workbook/bookmark/${workbookId}`);

// 문제집 북마크 해제 - OK
const useBookmarkDelete = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKeys.RECENT_WORKBOOK_LIST);
      queryClient.invalidateQueries(queryKeys.POPULAR_WORKBOOK_LIST);
      queryClient.invalidateQueries(queryKeys.SEARCH_LIST);
    },
  });
};

export default useBookmarkDelete;
