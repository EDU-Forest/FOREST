import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import authAxios from "@/utils/authAxios";

const fetcher = (classId: number) => {
  authAxios.get(`/api/class/${classId}/student`).then(({ data }) => data);
};

// 클래스 내 학생 목록 조회
const useClassStudentListQuery = (classId: number) => {
  return useQuery([queryKeys.CLASS_STUDENT_LIST, classId], () => fetcher(classId), {
    enabled: !!classId,
  });
};

export default useClassStudentListQuery;
