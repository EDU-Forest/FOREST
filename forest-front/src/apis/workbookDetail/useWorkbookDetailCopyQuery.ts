import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation, useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useRouter } from "next/router";

const fetcher = async (wId: number) =>
  await workbookAxios.post(`/workbook/${wId}`).then(({ data }) => {
    return data.data;
  });

const useWorkbookCopyPostQuery = (wId: number) => {
  const router = useRouter();

  return useMutation([queryKeys.COPY_WORKBOOK_DETAIL], () => fetcher(wId), {
    onSuccess: (data) => {
      router.push(`/workbook/${data.workbookInfo.workbookId}`, undefined, { shallow: true });
    },
  });
};

export default useWorkbookCopyPostQuery;
