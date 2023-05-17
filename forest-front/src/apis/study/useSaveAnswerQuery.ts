import studyAxios from "@/utils/customAxios/studyAxios";
import { useMutation } from "react-query";
import { IStudySaveAnswer } from "@/types/Study";

const fetcher = (payload: IStudySaveAnswer) =>
  studyAxios.patch("/study/problem", payload).then(({ data }) => data);

const useSaveAnswer = () => {
  return useMutation(fetcher, {
    onSuccess: () => {},
    onError: () => {},
  });
};

export default useSaveAnswer;
