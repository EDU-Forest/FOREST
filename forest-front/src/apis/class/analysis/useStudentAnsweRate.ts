import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/studyAxios";

const fetcher = (studyId: number) => studyAxios.get(`/api/study/class/result/student/${studyId}`);

const useStudentAnsweRate = (studyId: number) => {
  return useQuery([queryKeys.STUDENT_ANSWER_RATE], () => fetcher(studyId), {
    refetchOnWindowFocus: false,
    enabled: !!studyId,
    onSuccess: (data) => {
      console.log("응시자별 정답률", data);
    },
  });
};

export default useStudentAnsweRate;
