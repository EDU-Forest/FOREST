import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/customAxios/studyAxios";

const fetcher = (studyId: number) =>
  studyAxios.get(`/api/study/class/result/all/${studyId}`).then(({ data }) => data.data);

const useAllAnswerRateQuery = (studyId: number) => {
  return useQuery([queryKeys.ALL_ANSWER_RATE, studyId], () => fetcher(studyId), {
    refetchOnWindowFocus: false,
    enabled: !!studyId,
    onSuccess: (data) => {
      console.log("전체 정답률", data);
    },
  });
};

export default useAllAnswerRateQuery;
