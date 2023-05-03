import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/studyAxios";
import { useDispatch } from "react-redux";
import { setStudy } from "@/stores/class/classInfo";

const fetcher = (classId: number) =>
  studyAxios.get(`/api/study/recent/${classId}`).then(({ data }) => data.data);

const useRecentStudyIdQuery = (classId: number) => {
  const dispatch = useDispatch();
  return useQuery([queryKeys.RECENT_CLASSID], () => fetcher(classId), {
    enabled: !!classId,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log("최근 스터디", data);
      dispatch(setStudy(data));
    },
  });
};

export default useRecentStudyIdQuery;
