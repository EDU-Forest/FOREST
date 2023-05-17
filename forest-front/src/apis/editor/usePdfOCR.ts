import { closeWholePdfModal } from "@/stores/editor/editorModal";
import { setQuestions } from "@/stores/editor/editorQuestions";
import { RootState } from "@/stores/store";
import { QuestionType } from "@/types/Workbook";
import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";

interface IPayload {
  curWorkbookId: number;
  file: FormData;
}

interface ProblemList {
  type: string;
  title: string;
  problemImgPath: string;
  imgIsEmpty: boolean;
  text: string;
  textIsEmpty: boolean;
  point: number;
  itemList: [];
}

const fetcher = (payload: IPayload) =>
  workbookAxios
    .post(`/workbook/ocr/pdf/${payload.curWorkbookId}`, payload.file, {
      timeout: 100000,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ data }) => {
      return data.data;
    });

const usePdfOCR = () => {
  const { questions } = useSelector((state: RootState) => state.editorQuestions);

  const dispatch = useDispatch();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      const problemList: ProblemList[] = data.data.problemList;
      const nowIdx = questions.length;
      let newQuestions = questions;

      problemList.forEach((item, idx) => {
        const question: QuestionType = {
          problemId: 0,
          problemNum: nowIdx + idx + 1,
          type: item.type,
          title: item.title,
          text: item.text,
          answer: "",
          point: item.point,
          problemImgPath: item.problemImgPath,
          itemList: item.itemList,
          imgIsEmpty: item.imgIsEmpty,
          textIsEmpty: item.textIsEmpty,
        };
        newQuestions = [...newQuestions, question];
      });

      dispatch(setQuestions(newQuestions));
      dispatch(closeWholePdfModal());
    },
  });
};

export default usePdfOCR;
