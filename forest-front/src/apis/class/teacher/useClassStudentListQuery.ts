import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import authAxios from "@/utils/authAxios";

const fetcher = (classId: number) => {
  authAxios.get(`/api/class/${classId}/student`).then(({ data }) => data);
};

const useClassStudentListQuery = (classId: number) => {
  return useQuery([queryKeys.CLASS_STUDENT_LIST, classId], () => fetcher(classId), {
    enabled: !!classId,
  });
};

export default useClassStudentListQuery;
