import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/customAxios/studyAxios";

interface ClassAnswerRateList {
  problemNum: number;
  correctRate: number;
  incorrectRate: number;
  ungradedRate: number;
}

const fetcher = (studyId: number) =>
  studyAxios.get(`/study/class/result/question/${studyId}`).then(({ data }) => {
    const studentStudyProblemResultList: ClassAnswerRateList[] = data.data.classAnswerRateList;
    return studentStudyProblemResultList;
  });

const useQuestionAnswerRateQuery = (studyId: number) => {
  return useQuery([queryKeys.QUESTION_ANSWER_RATE], () => fetcher(studyId), {
    refetchOnWindowFocus: false,
    enabled: !!studyId,
  });
};

export default useQuestionAnswerRateQuery;
