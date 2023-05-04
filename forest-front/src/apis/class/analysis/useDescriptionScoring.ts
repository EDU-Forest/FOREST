import studyAxios from "@/utils/studyAxios";
import { useMutation } from "react-query";

interface StudentPoint {
  studentNum: number;
  score: number;
}

interface Payload {
  problemListId: number;
  studyId: number;
  point: number;
  isLast: boolean;
  studentPointList: StudentPoint[];
}

const fetcher = (payload: Payload) =>
  studyAxios.patch("/api/study/descript").then(({ data }) => data);

const useDescriptionScoring = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("서술형 채점... 제발", data);
    },
  });
};

export default useDescriptionScoring;
