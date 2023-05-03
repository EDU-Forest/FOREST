import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/studyAxios";

const fetcher = (userId: number) =>
  studyAxios.get(`/api/study/calendar/${userId}`).then(({ data }) => data.data);

const useScheduleQuery = (userId: number) => {
  return useQuery([queryKeys.GET_SCHEDULE, userId], () => fetcher(userId), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log("스케줄", data);
    },
    onError: (err) => {
      console.log("에러", err);
    },
  });
};

export default useScheduleQuery;
