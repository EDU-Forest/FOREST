import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import authAxios from "@/utils/customAxios/authAxios";
import { useDispatch } from "react-redux";
import { setClass } from "@/stores/class/classInfo";
import { IClassList } from "@/types/ClassList";
import { useRouter } from "next/router";

const fetcher = () =>
  authAxios.get("/api/class/recent").then(({ data }) => {
    const recentClass: IClassList = data.data;
    return recentClass;
  });

// 최근 클래스 조회 (로그인 시) - OK
const useRecentClassIdQuery = (username: string, role: string) => {
  const router = useRouter();
  const dispatch = useDispatch();
  return useQuery([queryKeys.RECENT_CLASSID], fetcher, {
    enabled: username !== "" && role !== "",
    onSuccess: (recentClass) => {
      dispatch(setClass(recentClass));
      router.push(`/${role.toLowerCase()}/dashboard`, undefined, { shallow: true });
    },
  });
};

export default useRecentClassIdQuery;
