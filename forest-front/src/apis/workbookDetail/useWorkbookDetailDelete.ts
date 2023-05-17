import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation } from "react-query";

const fetcher = async (wId: number) =>
  await workbookAxios.delete(`/workbook/${wId}`).then(({ data }) => {
    return data;
  });

const useWorkbookDetailDelete = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      return data;
    },
  });
};

export default useWorkbookDetailDelete;
