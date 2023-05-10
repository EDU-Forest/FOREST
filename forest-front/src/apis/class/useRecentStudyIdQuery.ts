import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/customAxios/studyAxios";
import { useDispatch } from "react-redux";
import { setStudy } from "@/stores/class/classInfo";

const fetcher = (classId: number) =>
  studyAxios.get(`/api/study/recent/${classId}`).then(({ data }) => {
    const recentClassId: number = data.data.studyId;
    return recentClassId;
  });

// 최근 진행한 시험 결과 조회 - OK
const useRecentStudyIdQuery = (classId: number) => {
  const dispatch = useDispatch();
  return useQuery([queryKeys.RECENT_CLASSID, classId], () => fetcher(classId), {
    enabled: !!classId,
    refetchOnWindowFocus: false,
    onSuccess: (recentClassId) => {
      if (recentClassId) {
        dispatch(setStudy(recentClassId));
      } else {
        dispatch(setStudy(-1));
      }
    },
  });
};

export default useRecentStudyIdQuery;
