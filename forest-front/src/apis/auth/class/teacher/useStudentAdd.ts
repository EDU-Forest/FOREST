import authAxios from "@/utils/authAxios";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

// const fetcher = (studentList: []) => {
//   authAxios
//     .post("/api/class/student", {
//       studentList,
//     })
//     .then(({ data }) => data);
// };

const useStudentAdd = (studentList: []) => {
  const queryClient = useQueryClient();
  return useMutation(
    () =>
      authAxios
        .post("/api/class/student", {
          studentList,
        })
        .then(({ data }) => data),
    {
      onSuccess: (data) => {
        // 학생 추가 후 목록 재조회
        return queryClient.invalidateQueries(queryKeys.STUDENT_LIST);
      },
    },
  );
};

export default useStudentAdd;
