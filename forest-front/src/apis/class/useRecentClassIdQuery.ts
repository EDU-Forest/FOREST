import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import authAxios from "@/utils/authAxios";
import { useDispatch } from "react-redux";
import { setClass } from "@/stores/class/classInfo";

const fetcher = () => authAxios.get("/api/class/recent").then(({ data }) => data);

const useRecentClassIdQuery = () => {
  const dispatch = useDispatch();
  return useQuery([queryKeys.RECENT_CLASSID], fetcher, {
    onSuccess: (data) => {
      console.log("useRecentClassIdQuery 성공했닭!", data.data);
      dispatch(setClass(data.data));
    },
  });
};

export default useRecentClassIdQuery;
