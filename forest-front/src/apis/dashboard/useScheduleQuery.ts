import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/customAxios/studyAxios";

const fetcher = () => studyAxios.get(`/api/study/calendar`).then(({ data }) => data.data);

const useScheduleQuery = () => {
  return useQuery([queryKeys.GET_SCHEDULE], fetcher, {
    refetchOnWindowFocus: false,
  });
};

export default useScheduleQuery;
