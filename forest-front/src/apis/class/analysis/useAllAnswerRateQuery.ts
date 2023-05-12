import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/customAxios/studyAxios";
import { AnswerRate } from "@/types/AnswerRate";
import { useDispatch } from "react-redux";
import { setAnalysisBack } from "@/stores/class/classInfo";

const fetcher = (studyId: number) =>
  studyAxios.get(`/api/study/class/result/all/${studyId}`).then(({ data }) => {
    const rate: AnswerRate = data.data;
    return rate;
  });

const useAllAnswerRateQuery = (studyId: number) => {
  const dispatch = useDispatch();
  return useQuery([queryKeys.ALL_ANSWER_RATE, studyId], () => fetcher(studyId), {
    refetchOnWindowFocus: false,
    enabled: !!studyId,
    // onSuccess: () => {
    //   dispatch(setAnalysisBack(true));
    // },
  });
};

export default useAllAnswerRateQuery;
