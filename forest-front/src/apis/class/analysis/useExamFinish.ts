import studyAxios from "@/utils/customAxios/studyAxios";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (studyId: number) => studyAxios.patch(`/api/study/exit/${studyId}`);

const useExamFinish = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("시험 종료됨~");
      queryClient.invalidateQueries(queryKeys.DESCRIPTION);
      queryClient.invalidateQueries(queryKeys.STUDY_RESULT);
    },
  });
};

export default useExamFinish;
