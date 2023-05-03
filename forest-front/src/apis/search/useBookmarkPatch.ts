import workbookAxios from "@/utils/workbookAxios";
import { useMutation } from "react-query";

const fetcher = (workbookId: number) =>
  workbookAxios.patch(`/api/workbook/bookmark/${workbookId}`).then(({ data }) => data);

const useBookmarkPatch = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("북마크 성공", data);
    },
  });
};

export default useBookmarkPatch;
