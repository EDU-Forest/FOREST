import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import authAxios from "@/utils/authAxios";

const fetcher = (classId: number) => {
  authAxios.get(`/api/class/${classId}/student`).then(({ data }) => data);
};

const useStudentListQuery = (classId: number) => {
  return useQuery([queryKeys.STUDENT_LIST, classId], () => fetcher(classId), {
    enabled: !!classId,
  });
};

export default useStudentListQuery;
