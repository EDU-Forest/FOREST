import workbookAxios from "@/utils/workbookAxios";
import { useMutation, useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useRouter } from "next/router";

const fetcher = async (wId: number) =>
  await workbookAxios.post(`/api/workbook/copy/${wId}`).then(({ data }) => {
    return data.data;
  });

const useWorkbookCopyPostQuery = (wId: number) => {
  const router = useRouter();

  return useMutation([queryKeys.COPY_WORKBOOK_DETAIL], () => fetcher(wId), {
    onSuccess: (data) => {
      console.log("사본 성공 post", data);
      router.push(`/workbook/${data.data.role.workbookInfo.workbookId}`);
    },
  });
};

export default useWorkbookCopyPostQuery;