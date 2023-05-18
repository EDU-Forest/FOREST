import { closePartPdfModal } from "@/stores/editor/editorModal";
import { setCurQuestion, setQuestions } from "@/stores/editor/editorQuestions";
import { RootState } from "@/stores/store";
import { QuestionType } from "@/types/Workbook";
import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";

interface IPayload {
  curWorkbookId: number;
  file: FormData;
}

const fetcher = (payload: IPayload) =>
  workbookAxios
    .post(`/wb/ocr/img/${payload.curWorkbookId}`, payload.file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => data.data);

const useImgOCR = () => {
  const { questions } = useSelector((state: RootState) => state.editorQuestions);
  const { curQuestion } = useSelector((state: RootState) => state.editorQuestions);
  const dispatch = useDispatch();
  return useMutation(fetcher, {
    onSuccess: (data) => {
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
      // 비어있는 문제집이 아닐 때만 다음 번호를 현재로
      if (questions.length !== 0) {
        dispatch(setCurQuestion(curQuestion + 1));
      }
    },
  });
};

export default useImgOCR;
