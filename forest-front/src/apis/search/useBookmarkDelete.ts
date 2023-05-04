import workbookAxios from "@/utils/workbookAxios";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (workbookId: number) =>
  workbookAxios.delete(`/api/workbook/bookmark/${workbookId}`);

const useBookmarkDelete = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("북마크 해제 ", data);
      queryClient.invalidateQueries(queryKeys.RECENT_WORKBOOK_LIST);
      queryClient.invalidateQueries(queryKeys.POPULAR_WORKBOOK_LIST);
    },
  });
};

export default useBookmarkDelete;
