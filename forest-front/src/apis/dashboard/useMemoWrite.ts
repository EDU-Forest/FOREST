import authAxios from "@/utils/authAxios";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (memo: string) =>
  authAxios.post("/api/memo", { content: memo }).then(({ data }) => data.data);

const useMemoWrite = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      return queryClient.invalidateQueries(queryKeys.GET_MEMO);
    },
  });
};

export default useMemoWrite;
