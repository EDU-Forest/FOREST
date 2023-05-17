import * as queryKeys from "@/constants/queryKeys";
import { useQuery } from "react-query";
import studyAxios from "@/utils/customAxios/studyAxios";
import { useDispatch, useSelector } from "react-redux";
import { setStudyProblems } from "@/stores/exam/exam";
import { RootState } from "@/stores/store";

const fetcher = (studyId: number) =>
  studyAxios.get(`/study/problem/${studyId}`).then(({ data }) => {
    return data;
  });

const useGetStudyProblems = (studyId: number) => {
  const { isStarted } = useSelector((state: RootState) => state.exam);
  const dispatch = useDispatch();
  return useQuery([queryKeys.STUDY_PROBLEMS, isStarted], () => fetcher(studyId), {
    enabled: !!isStarted,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      dispatch(setStudyProblems(data.data));
    },
    onError: (error) => {},
  });
};

export default useGetStudyProblems;
