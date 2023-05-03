import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/studyAxios";
import { useDispatch } from "react-redux";
import { setStudy } from "@/stores/class/classInfo";

const fetcher = (classId: number) =>
  studyAxios.get(`/api/study/recent/${classId}`).then(({ data }) => data.data);

// 최근 진행한 시험 결과 조회 - OK
const useRecentStudyIdQuery = (classId: number) => {
  const dispatch = useDispatch();
  return useQuery([queryKeys.RECENT_CLASSID, classId], () => fetcher(classId), {
    enabled: !!classId,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      dispatch(setStudy(data));
    },
  });
};

export default useRecentStudyIdQuery;