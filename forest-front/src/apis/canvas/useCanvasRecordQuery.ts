import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/customAxios/studyAxios";
import { ICanvasRecord } from "@/types/CanvasRecord";
import { useDispatch } from "react-redux";
import { setPaths } from "@/stores/exam/canvas";

const fetcher = (studentStudyProblemId: number) =>
  studyAxios.get(`/api/canvas/${studentStudyProblemId}`).then(({ data }) => {
    const record: ICanvasRecord = data.data;
    return record;
  });

const useCanvasRecordQuery = (studentStudyProblemId: number, isOpenCanvas: boolean) => {
  const dispatch = useDispatch();
  return useQuery(
    [queryKeys.CANVAS_RECORD, studentStudyProblemId],
    () => fetcher(studentStudyProblemId),
    {
      refetchOnWindowFocus: false,
      enabled: !!studentStudyProblemId && !!isOpenCanvas,
      onSuccess: (record) => {
        console.log("성공!", record);
        dispatch(setPaths(record.line));
      },
      onError(err) {
        console.log("실패했어", err);
      },
      onSettled(data, error) {
        console.log("보낼것임다");
      },
    },
  );
};

export default useCanvasRecordQuery;
