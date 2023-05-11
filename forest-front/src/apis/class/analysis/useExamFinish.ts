import studyAxios from "@/utils/customAxios/studyAxios";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useDispatch } from "react-redux";
import { setHaveDescript } from "@/stores/class/classInfo";

const fetcher = (studyId: number) =>
  studyAxios.patch(`/api/study/exit/class/${studyId}`).then((data) => data);

const useExamFinish = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("시험 종료됨~", data);
      if (data.data.status === "STUDY_EXIST_DESCRIPT") {
        dispatch(setHaveDescript(true));
      } else {
        dispatch(setHaveDescript(false));
      }
      queryClient.invalidateQueries(queryKeys.DESCRIPTION);
      queryClient.invalidateQueries(queryKeys.STUDY_RESULT);
    },
  });
};

export default useExamFinish;
