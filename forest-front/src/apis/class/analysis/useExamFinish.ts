import studyAxios from "@/utils/customAxios/studyAxios";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = (studyId: number) =>
  studyAxios.patch(`/study/exit/class/${studyId}`).then((data) => data);

const useExamFinish = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKeys.DESCRIPTION);
      queryClient.invalidateQueries(queryKeys.STUDY_RESULT);
    },
  });
};

export default useExamFinish;
