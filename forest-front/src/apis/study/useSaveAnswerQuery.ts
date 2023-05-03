import studyAxios from "@/utils/studyAxios";
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
