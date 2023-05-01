import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import authAxios from "@/utils/authAxios";

const fetcher = (userName: string) => {
  authAxios.get("/api/user/search", { params: { userName } }).then(({ data }) => data);
};
const useSearchClassStudentQuery = (userName: string) => {
  return useQuery([queryKeys.SEARCH_CLASS_STUDENT, userName], () => fetcher(userName), {
    enabled: !!userName,
  });
};

export default useSearchClassStudentQuery;
