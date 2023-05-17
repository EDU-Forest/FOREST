import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/customAxios/studyAxios";

const fetcher = (studentStudyResultId: number) =>
  studyAxios.get(`/study/detail/question/${studentStudyResultId}`).then(({ data }) => data.data);

const useStudentQuestionResultQuery = (studentStudyResultId: number) => {
  return useQuery(
    [queryKeys.STUDENT_QUESTION_RESULT, studentStudyResultId],
    () => fetcher(studentStudyResultId),
    {
      refetchOnWindowFocus: false,
      enabled: !!studentStudyResultId,
      onSuccess: (data) => {},
    },
  );
};

export default useStudentQuestionResultQuery;
