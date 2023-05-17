import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/customAxios/studyAxios";
import { AnswerRate } from "@/types/AnswerRate";

const fetcher = (studyId: number) =>
  studyAxios.get(`/study/class/result/all/${studyId}`).then(({ data }) => {
    const rate: AnswerRate = data.data;
    return rate;
  });

const useAllAnswerRateQuery = (studyId: number) => {
  return useQuery([queryKeys.ALL_ANSWER_RATE, studyId], () => fetcher(studyId), {
    refetchOnWindowFocus: false,
    enabled: !!studyId,
  });
};

export default useAllAnswerRateQuery;
