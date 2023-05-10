import { closeWholePdfModal } from "@/stores/editor/editorModal";
import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";

interface IPayload {
  curWorkbookId: number;
  file: FormData;
}
const fetcher = (payload: IPayload) =>
  workbookAxios
    .post(`/api/workbook/ocr/pdf/${payload.curWorkbookId}`, payload.file, {
      timeout: 100000,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => {
      console.log("ocr 반환", data);
      return data;
    });

const usePdfOCR = () => {
  const dispatch = useDispatch();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("pdf OCR", data);
      dispatch(closeWholePdfModal());
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
