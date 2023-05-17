import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import authAxios from "@/utils/customAxios/authAxios";
import { IMemo } from "@/types/Memo";

const fetcher = () =>
  authAxios.get("/api/memo").then(({ data }) => {
    const memo: IMemo[] = data.data;
    return memo;
  });

const useMemoListQuery = () => {
  return useQuery([queryKeys.GET_MEMO], fetcher, {
    refetchOnWindowFocus: false,
  });
};

export default useMemoListQuery;
