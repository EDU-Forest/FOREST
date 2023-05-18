// 문제집 공개 여부 수정

import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation } from "react-query";

const fetcher = (workbookId: number) =>
  workbookAxios.patch(`/wb/public/${workbookId}`).then(({ data }) => {
    return data;
  });

const useIsPublicWorkbook = () => {
  return useMutation(fetcher, {});
};

export default useIsPublicWorkbook;
