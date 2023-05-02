import authAxios from "@/utils/authAxios";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (memoId: number) =>
  authAxios
    .patch("/api/memo", {
      memoId,
      isDeleted: true,
    })
    .then(({ data }) => data.data);

// 메모 삭제 - OK
const useMemoDelete = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      return queryClient.invalidateQueries(queryKeys.GET_MEMO);
    },
  });
};

export default useMemoDelete;
