import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import authAxios from "@/utils/customAxios/authAxios";

const fetcher = (classId: number) =>
  authAxios.get(`/api/class/${classId}/student`).then(({ data }) => data.data);

// 클래스 내 학생 목록 조회 - OK
const useClassStudentListQuery = (classId: number) => {
  return useQuery([queryKeys.CLASS_STUDENT_LIST, classId], () => fetcher(classId), {
    enabled: !!classId,
    refetchOnWindowFocus: false,
  });
};

export default useClassStudentListQuery;
