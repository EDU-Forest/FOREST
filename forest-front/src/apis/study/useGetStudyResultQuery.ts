import studyAxios from "@/utils/studyAxios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

interface Iprops {
  studyId: number;
  setStudyResult: (studyResult: IStudyResult) => void;
}

const fetcher = (studyId: number) =>
  studyAxios.get(`/api/study/student/result/${studyId}`).then(({ data }) => {
    console.log(data);
    return data;
  });

const useGetStudyResult = ({ studyId, setStudyResult }: Iprops) => {
  return useQuery(queryKeys.GET_STUDY_RESULT, () => fetcher(studyId), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setStudyResult(data.data);
    },
  });
};

export default useGetStudyResult;
