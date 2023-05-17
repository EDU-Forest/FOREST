import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation, useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useRouter } from "next/router";

const fetcher = async (wId: number) =>
  await workbookAxios.patch(`/api/workbook/public/${wId}`).then(({ data }) => {
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
