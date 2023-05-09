import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/customAxios/studyAxios";
import { ScheduleList } from "@/types/ScheduleList";

const fetcher = () =>
  studyAxios.get(`/api/study/calendar`).then(({ data }) => {
    const studyList: ScheduleList[] = data.data.studyList;
    return studyList;
  });

const useScheduleQuery = () => {
  return useQuery([queryKeys.GET_SCHEDULE], fetcher, {
    refetchOnWindowFocus: false,
  });
};

export default useScheduleQuery;
