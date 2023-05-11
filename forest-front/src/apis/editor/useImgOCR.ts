import { closePartPdfModal } from "@/stores/editor/editorModal";
import { setQuestions } from "@/stores/editor/editorQuestions";
import { RootState } from "@/stores/store";
import { QuestionType } from "@/types/Workbook";
import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
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
    .then(({ data }) => data.data);

const useImgOCR = () => {
  const { questions } = useSelector((state: RootState) => state.editorQuestions);
  const dispatch = useDispatch();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("이미지 OCR", data);
      const nowIdx = questions.length;
      const question: QuestionType = {
        problemId: 0,
        problemNum: nowIdx + 1,
        type: data.type,
        title: data.title,
        text: data.text,
        answer: "",
        point: data.point,
        problemImgPath: data.problemImgPath,
        itemList: data.itemList,
        imgIsEmpty: data.imgIsEmpty,
        textIsEmpty: data.textIsEmpty,
      };
      const newQuestions = [...questions, question];

      dispatch(setQuestions(newQuestions));
      dispatch(closePartPdfModal());
    },
  });
};

export default useImgOCR;
