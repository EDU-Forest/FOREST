import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = async (wId: number) =>
  await workbookAxios.patch(`/wb/public/${wId}`).then(({ data }) => {
    return data;
  });

const useWorkbookDetailPublicPatch = () => {
  return useMutation([queryKeys.COPY_WORKBOOK_DETAIL], fetcher, {
    onSuccess: (data) => {
      return data;
    },
  });
};

export default useWorkbookDetailPublicPatch;
