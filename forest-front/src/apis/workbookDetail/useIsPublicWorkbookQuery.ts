// 문제집 공개 여부 수정

import workbookAxios from "@/utils/workbookAxios";
import { useMutation } from "react-query";

const fetcher = (workbookId: number) =>
  workbookAxios.patch(`/api/workbook/public/${workbookId}`).then(({ data }) => {
    console.log(data);
    return data;
  });

const useIsPublicWorkbook = () => {
  return useMutation(fetcher, {});
};

export default useIsPublicWorkbook;
