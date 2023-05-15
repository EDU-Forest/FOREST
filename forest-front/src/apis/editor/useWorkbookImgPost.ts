import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation } from "react-query";

const config = {
  headers: { "Content-Type": "multipart/form-data" },
};

const fetcher = async (data: FormData) =>
  await workbookAxios.post(`/api/workbook/problem/img`, data, config).then(({ data }) => {
    return data;
  });

const useWorkbookImgPost = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      // 응답 받은 이미지를 이미지 위치에 삽입/변경하기 위해 return
      return data;
    },
  });
};

export default useWorkbookImgPost;
