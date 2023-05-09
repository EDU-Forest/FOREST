import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation } from "react-query";

const fetcher = (file: FormData) =>
  workbookAxios
    .post("/api/workbook/ocr/img", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data);

const useImgOCR = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("이미지 OCR", data);
    },
    onError: (err) => {
      console.log("err", err);
    },
    onMutate(variables) {
      console.log("var", variables);
    },
  });
};

export default useImgOCR;
