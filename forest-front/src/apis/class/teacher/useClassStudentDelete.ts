import authAxios from "@/utils/authAxios";
import { useMutation } from "react-query";

const useClassStudentDelete = () => {
  return useMutation(() => authAxios.patch("/api/class/student"));
};
