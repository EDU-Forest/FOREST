import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/customAxios/studyAxios";
import { useDispatch } from "react-redux";
import { setStudy } from "@/stores/class/classInfo";

const fetcher = (classId: number) =>
  studyAxios.get(`/study/recent/${classId}`).then(({ data }) => {
    const recentStudyId: number = data.data.studyId;
    return recentStudyId;
  });

// 최근 진행한 시험 결과 조회 - OK
const useRecentStudyIdQuery = (classId: number) => {
  const dispatch = useDispatch();
  return useQuery([queryKeys.RECENT_CLASSID, classId], () => fetcher(classId), {
    enabled: !!classId && classId !== -1,
    refetchOnWindowFocus: false,
    onSuccess: (recentStudyId) => {
      if (recentStudyId) {
        dispatch(setStudy(recentStudyId));
      } else {
        dispatch(setStudy(-1));
      }
    },
  });
};

export default useRecentStudyIdQuery;
