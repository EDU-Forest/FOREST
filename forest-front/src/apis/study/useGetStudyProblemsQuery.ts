import * as queryKeys from "@/constants/queryKeys";
import { useQuery } from "react-query";
import studyAxios from "@/utils/customAxios/studyAxios";
import { useDispatch } from "react-redux";
import { setStudyProblems, setToggleModal } from "@/stores/exam/exam";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

const fetcher = (studyId: number) =>
  studyAxios.get(`/api/study/problem/${studyId}`).then(({ data }) => {
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
      console.log("시험 문제 불러오기", data.data);

      // router.push(`/test/${studyId}`);
    },
    onError: (error) => {
      console.log("err", error);
    },
  });
};

export default useGetStudyProblems;
