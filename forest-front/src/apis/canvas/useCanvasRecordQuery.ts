import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/studyAxios";

const fetcher = (studentStudyProblemId: number) =>
  studyAxios.get(`/api/canvas/${studentStudyProblemId}`).then(({ data }) => data.data);

const useCanvasRecordQuery = (studentStudyProblemId: number) => {
  return useQuery([queryKeys.CANVAS_RECORD], () => fetcher(studentStudyProblemId), {});
};

export default useCanvasRecordQuery;
