import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/customAxios/studyAxios";
import { useDispatch } from "react-redux";
import { setAnalysisId, setSelectedStudy, setStudyType } from "@/stores/class/classInfo";

const fetcher = (studyId: number) =>
  studyAxios.get(`/study/${studyId}`).then(({ data }) => {
    return data;
  });

// 시험 결과 조회 (선생님 클래스 클릭, 분석페이지)
const useStudyResultQuery = (studyId: number, isAnalysis: boolean) => {
  const dispatch = useDispatch();
  return useQuery([queryKeys.STUDY_RESULT, studyId], () => fetcher(studyId), {
    enabled: !!studyId && studyId !== -1,
    refetchOnWindowFocus: false,
    onSuccess(data) {
      dispatch(setStudyType(data?.data.studyType.toLowerCase()));
      console.log("...", data);
      if (isAnalysis) {
        dispatch(setAnalysisId(studyId));
        dispatch(setSelectedStudy({ isDescript: data?.data.isDescript }));
      } else {
        dispatch(setAnalysisId(-1));
      }
    },
  });
};

export default useStudyResultQuery;
