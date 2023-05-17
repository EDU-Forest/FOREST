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
    .patch("/study/descript", {
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
      console.log("채점", data);
    },
    onMutate(variables) {},
  });
};

export default useDescriptionScoring;
