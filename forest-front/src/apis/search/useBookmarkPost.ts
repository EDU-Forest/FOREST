import workbookAxios from "@/utils/workbookAxios";
import { useMutation } from "react-query";

const fetcher = (workbookId: number) =>
  workbookAxios.post(`/api/workbook/bookmark/${workbookId}`).then(({ data }) => data);

const useBookmarkPost = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("북마크 성공 post", data);
    },
  });
};

export default useBookmarkPost;
