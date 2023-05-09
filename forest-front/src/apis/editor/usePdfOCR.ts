import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation } from "react-query";

const fetcher = (formData: FormData) =>
  workbookAxios.post("/api/workbook/ocr/pdf", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const usePdfOCR = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("pdf OCR", data);
    },
  });
};

export default usePdfOCR;
