import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/customAxios/studyAxios";
import { useDispatch } from "react-redux";
import { setFirstConnect, setStudy } from "@/stores/class/classInfo";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

const fetcher = (classId: number) =>
  studyAxios.get(`/api/study/recent/${classId}`).then(({ data }) => {
    const recentStudyId: number = data.data.studyId;
    return recentStudyId;
  });

// 최근 진행한 시험 결과 조회 - OK
const useRecentStudyIdQuery = (classId: number) => {
  const { nowClassId, firstConnect } = useSelector((state: RootState) => state.class);
  const dispatch = useDispatch();
  return useQuery([queryKeys.RECENT_CLASSID, classId], () => fetcher(classId), {
    enabled: (!!classId && nowClassId !== classId) || firstConnect,
    refetchOnWindowFocus: false,
    onSuccess: (recentStudyId) => {
      if (recentStudyId) {
        dispatch(setStudy(recentStudyId));
        dispatch(setFirstConnect(false));
      } else {
        dispatch(setStudy(-1));
      }
    },
  });
};

export default useRecentStudyIdQuery;
