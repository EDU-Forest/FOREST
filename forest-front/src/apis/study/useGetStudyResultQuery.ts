import studyAxios from "@/utils/customAxios/studyAxios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

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
  const { isEnded } = useSelector((state: RootState) => state.exam);

  return useQuery([queryKeys.GET_STUDY_RESULT, isEnded], () => fetcher(studyId), {
    enabled: !!isEnded,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setStudyResult(data.data);
    },
  });
};

export default useGetStudyResult;
