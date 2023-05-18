import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useRouter } from "next/router";

const fetcher = async (data: any) =>
  await workbookAxios.post(`/wb/export`, data).then(({ data }) => {
    return data;
  });

const useWorkbookDetailSetPost = () => {
  return useMutation([queryKeys.COPY_WORKBOOK_DETAIL], fetcher, {
    onSuccess: (data) => {
      return data;
    },
  });
};

export default useWorkbookDetailSetPost;
