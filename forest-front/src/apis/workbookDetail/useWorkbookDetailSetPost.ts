import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation, useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useRouter } from "next/router";

const fetcher = async (data: any) =>
  await workbookAxios.post(`/api/workbook/export`, data).then(({ data }) => {
    return data;
  });

const useWorkbookDetailSetPost = () => {
  const router = useRouter();

  return useMutation([queryKeys.COPY_WORKBOOK_DETAIL], fetcher, {
    onSuccess: (data) => {
      return data;
    },
  });
};

export default useWorkbookDetailSetPost;
