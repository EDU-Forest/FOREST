import studyAxios from "@/utils/customAxios/studyAxios";
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
  studyAxios
    .patch("/api/study/descript", {
      problemListId: payload.problemListId,
      studyId: payload.studyId,
      point: payload.point,
      isLast: payload.isLast,
      studentPointList: payload.studentPointList,
    })
    .then(({ data }) => data);

const useDescriptionScoring = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("서술형 채점... 제발", data);
    },
    onMutate(variables) {
      console.log("이렇게 보냄..", variables);
    },
  });
};

export default useDescriptionScoring;
