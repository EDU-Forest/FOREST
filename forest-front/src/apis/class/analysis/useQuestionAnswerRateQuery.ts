import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/studyAxios";

const fetcher = (studyId: number) => studyAxios.get(`/api/study/class/result/question/${studyId}`);

const useQuestionAnswerRateQuery = (studyId: number) => {
  return useQuery([queryKeys.QUESTION_ANSWER_RATE], () => fetcher(studyId), {
    refetchOnWindowFocus: false,
    enabled: !!studyId,
    onSuccess: (data) => {
      console.log("문항별 정답률", data);
    },
  });
};

export default useQuestionAnswerRateQuery;
