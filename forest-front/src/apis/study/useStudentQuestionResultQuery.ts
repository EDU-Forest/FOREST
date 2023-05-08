import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/customAxios/studyAxios";

const fetcher = (studentStudyResultId: number) =>
  studyAxios
    .get(`/api/study/detail/question/${studentStudyResultId}`)
    .then(({ data }) => data.data);

const useStudentQuestionResultQuery = (studentStudyResultId: number) => {
  return useQuery(
    [queryKeys.STUDENT_QUESTION_RESULT, studentStudyResultId],
    () => fetcher(studentStudyResultId),
    {
      onSuccess: (data) => {
        console.log("선생님이 학생 문항별 조회", data);
      },
    },
  );
};

export default useStudentQuestionResultQuery;
