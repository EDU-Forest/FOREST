import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation } from "react-query";

const fetcher = (file: FormData) =>
  workbookAxios
    .post("/api/workbook/ocr/pdf", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data);

const usePdfOCR = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("pdf OCR", data);
    },
    onError: (err) => {
      console.log("err", err);
    },
    onMutate(variables) {
      console.log("var", variables);
    },
  });
};

export default usePdfOCR;
