import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/customAxios/studyAxios";

const fetcher = (studentStudyResultId: number) =>
  studyAxios.get(`/api/study/detail/result/${studentStudyResultId}`).then(({ data }) => data.data);

const useStudentDetailResultQuery = (studentStudyResultId: number) => {
  return useQuery(
    [queryKeys.STUDENT_DETAIL_RESULT, studentStudyResultId],
    () => fetcher(studentStudyResultId),
    {
      refetchOnWindowFocus: false,
      enabled: !!studentStudyResultId,
      onSuccess: (data) => {
        console.log("선생님이 학생 성적 상세 조회 ", data);
      },
    },
  );
};

export default useStudentDetailResultQuery;
