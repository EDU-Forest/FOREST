import authAxios from "@/utils/authAxios";
import { useMutation } from "react-query";

// 클래스 내 학생 삭제
const useClassStudentDelete = () => {
  return useMutation(() => authAxios.patch("/api/class/student"));
};
