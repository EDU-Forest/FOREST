import workbookAxios from "@/utils/workbookAxios";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (workbookId: number) =>
  workbookAxios.post(`/api/workbook/bookmark/${workbookId}`).then(({ data }) => data);

const useBookmarkPost = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("북마크 성공 post", data);
      queryClient.invalidateQueries(queryKeys.RECENT_WORKBOOK_LIST);
      queryClient.invalidateQueries(queryKeys.POPULAR_WORKBOOK_LIST);
    },
  });
};

export default useBookmarkPost;
