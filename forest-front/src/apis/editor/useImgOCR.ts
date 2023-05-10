import { closePartPdfModal } from "@/stores/editor/editorModal";
import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";

interface IPayload {
  curWorkbookId: number;
  file: FormData;
}

const fetcher = (payload: IPayload) =>
  workbookAxios
    .post(`/api/workbook/ocr/img/${payload.curWorkbookId}`, payload.file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data);

const useImgOCR = () => {
  const dispatch = useDispatch();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("이미지 OCR", data);
      dispatch(closePartPdfModal());
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
