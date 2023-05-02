import authAxios from "@/utils/authAxios";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (studentList: []) =>
  authAxios
    .post("/api/class/student", {
      studentList,
    })
    .then(({ data }) => data);

const useClassStudentAdd = (studentList: []) => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      // 학생 추가 후 목록 재조회
      return queryClient.invalidateQueries(queryKeys.CLASS_STUDENT_LIST);
    },
  });
};

export default useClassStudentAdd;
