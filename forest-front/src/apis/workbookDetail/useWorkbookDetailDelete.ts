import workbookAxios from "@/utils/workbookAxios";
import { useMutation } from "react-query";

const fetcher = async (wId: number) =>
  await workbookAxios.delete(`/api/workbook/${wId}`).then(({ data }) => {
    return data;
  });

const useWorkbookDetailDelete = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("문제집 삭제 성공 post", data);
    },
  });
};

export default useWorkbookDetailDelete;
