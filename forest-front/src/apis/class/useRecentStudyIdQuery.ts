import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/studyAxios";
import { useDispatch } from "react-redux";
import { setRecentStudyId } from "@/stores/class/classInfo";

const fetcher = (classId: number) => {
  studyAxios.get(`/api/study/recent/${classId}`);
};

const useRecentStudyIdQuery = (classId: number) => {
  const dispatch = useDispatch();
  return useQuery([queryKeys.RECENT_CLASSID], () => fetcher(classId), {
    enabled: !!classId,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log("최근 스터디", data);
      dispatch(setRecentStudyId);
    },
  });
};

export default useRecentStudyIdQuery;
