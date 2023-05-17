import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import authAxios from "@/utils/customAxios/authAxios";
import { IStudent } from "@/types/Student";

const fetcher = (userName: string, classId: number) =>
  authAxios.get("/api/user/search", { params: { classId, userName } }).then(({ data }) => {
    const studentList: IStudent[] = data.data;
    return studentList;
  });

// 학생 자동 검색 - OK
const useSearchClassStudentQuery = (userName: string, classId: number) => {
  return useQuery([queryKeys.SEARCH_CLASS_STUDENT, userName], () => fetcher(userName, classId), {
    enabled: !!userName,
  });
};

export default useSearchClassStudentQuery;
