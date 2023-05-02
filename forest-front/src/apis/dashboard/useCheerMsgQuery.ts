import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import authAxios from "@/utils/authAxios";

const fetcher = () => authAxios.get("/api/msg").then(({ data }) => data.data);

// 응원 메시지 조회 - OK
const useCheerMsgQuery = () => {
  return useQuery([queryKeys.CHEER_MSG], fetcher, {
    onSuccess: (data) => {
      console.log("응원 메시지", data);
    },
  });
};

export default useCheerMsgQuery;
