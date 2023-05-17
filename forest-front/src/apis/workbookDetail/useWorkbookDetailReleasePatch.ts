import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation, useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useRouter } from "next/router";

const fetcher = async (wId: number) =>
  await workbookAxios.patch(`/api/workbook/export/${wId}`).then(({ data }) => {
    return data;
  });

const useWorkbookDetailReleasePatch = () => {
  // const router = useRouter();

  return useMutation([queryKeys.COPY_WORKBOOK_DETAIL], fetcher, {
    onSuccess: (data) => {
      // router.push(`/workbook/${data.data.role.workbookInfo.workbookId}`);
      return data;
    },
  });
};

export default useWorkbookDetailReleasePatch;
