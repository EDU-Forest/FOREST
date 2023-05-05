import workbookAxios from "@/utils/workbookAxios";
import { useMutation, useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useRouter } from "next/router";

const fetcher = async (wId: number) =>
  await workbookAxios.post(`/api/workbook/export/${wId}`).then(({ data }) => {
    return data;
  });

const useWorkbookDetailSetPost = () => {
  const router = useRouter();

  return useMutation([queryKeys.COPY_WORKBOOK_DETAIL], fetcher, {
    onSuccess: (data) => {
      console.log("배포 성공 post", data);
      // router.push(`/workbook/${data.data.role.workbookInfo.workbookId}`);
    },
  });
};

export default useWorkbookDetailSetPost;
