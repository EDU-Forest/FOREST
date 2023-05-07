import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/customAxios/studyAxios";

const fetcher = (studyId: number) =>
  studyAxios.get(`/api/study/student/${studyId}`).then(({ data }) => data);

// 학생(클래스) 선택한 문제집 성적 조회
const useStudentScoreQuery = (studyId: number) => {
  return useQuery([queryKeys.STUDENT_SCORE, studyId], () => fetcher(studyId), {
    enabled: !!studyId && studyId !== -1,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log("학생 성적 조회 성공 ", data);
    },
  });
};

export default useStudentScoreQuery;
