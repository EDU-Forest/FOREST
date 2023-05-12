import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/customAxios/studyAxios";
import { useDispatch } from "react-redux";
import { setStudyType } from "@/stores/class/classInfo";

const fetcher = (studyId: number) =>
  studyAxios.get(`/api/study/${studyId}`).then(({ data }) => {
    console.log(data);
    return data;
  });

// 클릭 시 시험 결과 조회 (선생님 클래스)
const useStudyResultQuery = (studyId: number) => {
  const dispatch = useDispatch();
  return useQuery([queryKeys.STUDY_RESULT, studyId], () => fetcher(studyId), {
    enabled: !!studyId && studyId !== -1,
    refetchOnWindowFocus: false,
    onSuccess(data) {
      dispatch(setStudyType(data.data.studyType.toLowerCase()));
    },
  });
};

export default useStudyResultQuery;
