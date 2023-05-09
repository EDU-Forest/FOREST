import * as queryKeys from "@/constants/queryKeys";
import { useQuery } from "react-query";
import studyAxios from "@/utils/customAxios/studyAxios";
import { useDispatch } from "react-redux";
import { setStudyProblems } from "@/stores/exam/exam";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useRouter } from "next/router";

const fetcher = (studyId: number) =>
  studyAxios.get(`/api/study/problem/${studyId}`).then(({ data }) => {
    console.log("ff", data);
    return data;
  });

const useGetStudyProblems = (studyId: number) => {
  const { isStarted } = useSelector((state: RootState) => state.exam);
  const dispatch = useDispatch();
  return useQuery([queryKeys.STUDY_PROBLEMS, isStarted], () => fetcher(studyId), {
    // enabled: !!isStarted,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log(data.data);
      dispatch(setStudyProblems(data.data));
      // router.push(`/test/${studyId}`);
    },
    onError: (error) => {
      console.log("err", error);
    },
  });
};

export default useGetStudyProblems;
