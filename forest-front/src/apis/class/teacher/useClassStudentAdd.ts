import authAxios from "@/utils/authAxios";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useDispatch } from "react-redux";
import { closeAddStudentModal } from "@/stores/class/classModal";

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
  const dispatch = useDispatch();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      dispatch(closeAddStudentModal());
      // 학생 추가 후 목록 재조회
      return queryClient.invalidateQueries(queryKeys.CLASS_STUDENT_LIST);
    },
  });
};

export default useClassStudentAdd;
