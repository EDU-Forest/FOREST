import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation } from "react-query";

const fetcher = (formData: FormData) =>
  workbookAxios.post("/api/workbook/ocr/img", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const useImgOCR = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("이미지 OCR", data);
    },
  });
};

export default useImgOCR;
