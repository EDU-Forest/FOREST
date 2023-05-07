import studyAxios from "@/utils/customAxios/studyAxios";
import { useMutation } from "react-query";

const fetcher = (payload: IStudySaveAnswer) =>
  studyAxios.patch("/api/study/problem", payload).then(({ data }) => data);

const useSaveAnswer = () => {
  return useMutation(fetcher, {
    onSuccess: () => {},
    onError: () => {},
  });
};

export default useSaveAnswer;
