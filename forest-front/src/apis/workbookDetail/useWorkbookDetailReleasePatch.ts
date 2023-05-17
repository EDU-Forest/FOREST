import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = async (wId: number) =>
  await workbookAxios.patch(`/workbook/export/${wId}`).then(({ data }) => {
    return data;
  });

const useWorkbookDetailReleasePatch = () => {
  return useMutation([queryKeys.COPY_WORKBOOK_DETAIL], fetcher, {
    onSuccess: (data) => {
      return data;
    },
  });
};

export default useWorkbookDetailReleasePatch;
