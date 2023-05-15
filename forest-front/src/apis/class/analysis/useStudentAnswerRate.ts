import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/customAxios/studyAxios";
import { StudentStudyResultList } from "@/types/StudentStudyResultList";

const fetcher = (studyId: number) =>
  studyAxios.get(`/api/study/class/result/student/${studyId}`).then(({ data }) => {
    const studentStudyResultList = data.data.studentStudyResultList as StudentStudyResultList[];
    return studentStudyResultList;
  });

const useStudentAnswerRate = (studyId: number) => {
  return useQuery([queryKeys.STUDENT_ANSWER_RATE, studyId], () => fetcher(studyId), {
    refetchOnWindowFocus: false,
    enabled: !!studyId,
  });
};

export default useStudentAnswerRate;
