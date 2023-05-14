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
      onSuccess: (data) => {},
    },
  );
};

export default useStudentDetailResultQuery;
