import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import authAxios from "@/utils/customAxios/authAxios";
import { useDispatch, useSelector } from "react-redux";
import { setClass } from "@/stores/class/classInfo";
import { IClassList } from "@/types/ClassList";
import { RootState } from "@/stores/store";

const fetcher = () =>
  authAxios.get("/api/class/recent").then(({ data }) => {
    const recentClass: IClassList = data.data;
    return recentClass;
  });

// 최근 클래스 조회 (로그인 시) - OK
const useRecentClassIdQuery = () => {
  const dispatch = useDispatch();
  const { nowClassId } = useSelector((state: RootState) => state.class);
  return useQuery([queryKeys.RECENT_CLASSID], fetcher, {
    enabled: nowClassId === -1,
    onSuccess: (recentClass) => {
      console.log("recentClass", recentClass);
      dispatch(setClass(recentClass));
    },
  });
};

export default useRecentClassIdQuery;
