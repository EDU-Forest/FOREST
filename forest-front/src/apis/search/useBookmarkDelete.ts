import workbookAxios from "@/utils/workbookAxios";
import { useMutation } from "react-query";

const fetcher = (workbookId: number) =>
  workbookAxios.delete(`/api/workbook/bookmark/${workbookId}`);

const useBookmarkDelete = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("북마크 해제 ", data);
    },
  });
};

export default useBookmarkDelete;
