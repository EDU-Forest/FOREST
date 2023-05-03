import * as queryKeys from "@/constants/queryKeys";
import { useQuery } from "react-query";
import studyAxios from "@/utils/studyAxios";
import { useDispatch } from "react-redux";
import { setStudyProblems } from "@/stores/exam/exam";

interface Iprops {
  studyId: number;
}

const fetcher = (studyId: number) =>
  studyAxios.get(`/api/study/problem/${studyId}/${1}`).then(({ data }) => {
    console.log(data);
    return data;
  });

const useGetStudyProblems = ({ studyId }: Iprops) => {
  const dispatch = useDispatch();
  return useQuery(queryKeys.STUDY_PROBLEMS, () => fetcher(studyId), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      dispatch(setStudyProblems(data.data));
    },
  });
};

export default useGetStudyProblems;
