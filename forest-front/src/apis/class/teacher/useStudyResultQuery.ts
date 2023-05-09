import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/customAxios/studyAxios";
import { ITeacherExamResultAFTER, ITeacherExamResultBEFORE } from "@/types/TeacherExamResult";

const fetcher = (studyId: number) =>
  studyAxios.get(`/api/study/${studyId}`).then(({ data }) => {
    console.log(data);
    return data.data;
  });

// 클릭 시 시험 결과 조회 (선생님 클래스)
const useStudyResultQuery = (studyId: number) => {
  return useQuery([queryKeys.STUDY_RESULT, studyId], () => fetcher(studyId), {
    enabled: !!studyId && studyId !== -1,
    refetchOnWindowFocus: false,
  });
};

export default useStudyResultQuery;
