import workbookAxios from "@/utils/workbookAxios";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (workbookId: number) =>
  workbookAxios.patch(`/api/workbook/bookmark/${workbookId}`).then(({ data }) => data);

const useBookmarkPatch = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("북마크 성공", data);
      queryClient.invalidateQueries(queryKeys.RECENT_WORKBOOK_LIST);
      queryClient.invalidateQueries(queryKeys.POPULAR_WORKBOOK_LIST);
    },
  });
};

export default useBookmarkPatch;
