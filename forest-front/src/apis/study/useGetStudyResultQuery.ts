import studyAxios from "@/utils/customAxios/studyAxios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores/store";
import { IStudyResult } from "@/types/Study";
import { setResult } from "@/stores/exam/exam";

const fetcher = (studyId: number) =>
  studyAxios.get(`/study/student/result/${studyId}`).then(({ data }) => {
    const result: IStudyResult = data.data;
    return result;
  });

const useGetStudyResult = (studyId: number) => {
  const { isEnded } = useSelector((state: RootState) => state.exam);
  const dispatch = useDispatch();
  return useQuery([queryKeys.GET_STUDY_RESULT, studyId, isEnded], () => fetcher(studyId), {
    enabled: !!studyId && studyId !== -1,
    refetchOnWindowFocus: false,
    onSuccess: (result) => {
      dispatch(setResult(result));
    },
    onSettled(data, error) {},
  });
};

export default useGetStudyResult;
