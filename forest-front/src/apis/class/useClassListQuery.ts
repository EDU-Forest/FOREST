import authAxios from "@/utils/customAxios/authAxios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { IClassList } from "@/types/ClassList";

const fetcher = () =>
  authAxios.get("/api/class").then(({ data }) => {
    const classList: IClassList[] = data.data;
    return classList;
  });

// 클래스 목록 조회 - OK
const useClassListQuery = () => {
  return useQuery([queryKeys.CLASS_LIST], fetcher, {
    refetchOnWindowFocus: false,
  });
};

export default useClassListQuery;
