import authAxios from "@/utils/authAxios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = () => authAxios.get("/api/class").then(({ data }) => data.data);

// 클래스 목록 조회 - OK
const useClassListQuery = () => {
  return useQuery([queryKeys.CLASS_LIST], fetcher, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log("useClassListQuery 성공", data);
    },
  });
};

export default useClassListQuery;
