import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/customAxios/studyAxios";

const fetcher = (studentStudyProblemId: number) =>
  studyAxios.get(`/api/canvas/${studentStudyProblemId}`).then(({ data }) => data.data);

const useCanvasRecordQuery = (studentStudyProblemId: number, isOpenCanvas: boolean) => {
  return useQuery(
    [queryKeys.CANVAS_RECORD, studentStudyProblemId],
    () => fetcher(studentStudyProblemId),
    {
      refetchOnWindowFocus: false,
      enabled: !!studentStudyProblemId && !!isOpenCanvas,
      onSuccess: (data) => console.log("그림 불러오기 ~", data),
    },
  );
};

export default useCanvasRecordQuery;
