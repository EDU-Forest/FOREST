import studyAxios from "@/utils/customAxios/studyAxios";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (studyId: number) => studyAxios.post(`/api/study/exit/${studyId}`);

const useExamFinish = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("시험 종료됨~");
      queryClient.invalidateQueries(queryKeys.DESCRIPTION);
    },
  });
};

export default useExamFinish;
