import authAxios from "@/utils/authAxios";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

interface userId {
  userId: number;
}

interface Payload {
  classId: number;
  studentList: userId[];
}

const fetcher = (payload: Payload) =>
  authAxios
    .post("/api/class/student", {
      classId: payload.classId,
      studentList: payload.studentList,
    })
    .then(({ data }) => data);

// 클래스에 학생 추가
const useClassStudentAdd = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      // 학생 추가 후 목록 재조회
      console.log("하하 성공하니?", data);
      return queryClient.invalidateQueries(queryKeys.CLASS_STUDENT_LIST);
    },
    onSettled(data, error, variables, context) {
      console.log("variables", variables);
    },
    onError: (error, variables) => {
      console.log("하하하", variables);
    },
  });
};

export default useClassStudentAdd;
