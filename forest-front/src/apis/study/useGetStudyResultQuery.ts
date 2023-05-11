import studyAxios from "@/utils/customAxios/studyAxios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { IStudyResult } from "@/types/Study";
import { useDispatch } from "react-redux";
import { setResult } from "@/stores/exam/exam";

const fetcher = (studyId: number) =>
  studyAxios.get(`/api/study/student/result/${studyId}`).then(({ data }) => {
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
      console.log("useGetStudyResult", result);
    },
    onSettled(data, error) {
      console.log("에러니", error);
    },
  });
};

export default useGetStudyResult;
