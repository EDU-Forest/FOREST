import authAxios from "@/utils/customAxios/authAxios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = () =>
  authAxios.get("/api/class").then(({ data }) => {
    console.log(data);
    return data.data;
  });

// 클래스 목록 조회 - OK
const useClassListQuery = () => {
  return useQuery([queryKeys.CLASS_LIST], fetcher, {
    refetchOnWindowFocus: false,
  });
};

export default useClassListQuery;
