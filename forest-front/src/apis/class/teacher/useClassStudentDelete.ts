import authAxios from "@/utils/authAxios";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useDispatch } from "react-redux";
import { closeDeleteStudentModal } from "@/stores/class/classModal";

interface Payload {
  classId: number;
  userId: number;
}

const fetcher = ({ classId, userId }: Payload) =>
  authAxios
    .patch("/api/class/student", { classId: classId, userId: userId })
    .then(({ data }) => data);

// 클래스 내 학생 삭제 - OK
const useClassStudentDelete = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation(fetcher, {
    onSuccess: (data) => {
      dispatch(closeDeleteStudentModal());
      return queryClient.invalidateQueries(queryKeys.CLASS_STUDENT_LIST);
    },
  });
};

export default useClassStudentDelete;
