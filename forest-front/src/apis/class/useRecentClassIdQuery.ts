import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import authAxios from "@/utils/authAxios";
import { useDispatch } from "react-redux";
import { setClass } from "@/stores/class/classInfo";

const fetcher = () => authAxios.get("/api/class/recent").then(({ data }) => data);

// 최근 클래스 조회 (로그인 시) - OK
const useRecentClassIdQuery = () => {
  const dispatch = useDispatch();
  return useQuery([queryKeys.RECENT_CLASSID], fetcher, {
    onSuccess: (data) => {
      dispatch(setClass(data.data));
    },
  });
};

export default useRecentClassIdQuery;
