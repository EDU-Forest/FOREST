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
    [queryKeys.CANVAS_RECORD, studentStudyProblemId, isOpenCanvas],
    () => fetcher(studentStudyProblemId),
    {
      refetchOnWindowFocus: false,
      enabled: !!studentStudyProblemId && !!isOpenCanvas,
      cacheTime: 0,
      onSuccess: (record) => {
        console.log("성공!", record);
        dispatch(setPaths(record.line));
      },
    },
  );
};

export default useCanvasRecordQuery;
