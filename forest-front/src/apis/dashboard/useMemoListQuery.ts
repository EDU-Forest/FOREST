import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import authAxios from "@/utils/authAxios";

const fetcher = () => authAxios.get("/api/memo").then(({ data }) => data.data);

const useMemoListQuery = () => {
  return useQuery([queryKeys.GET_MEMO], fetcher, {
    refetchOnWindowFocus: false,
  });
};

export default useMemoListQuery;
