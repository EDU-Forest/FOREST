import studyAxios from "@/utils/customAxios/studyAxios";
import { useMutation } from "react-query";

interface Payload {
  studentStudyProblemId: number;
  line: object;
}

const fetcher = (payload: Payload) =>
  studyAxios
    .post("/api/canvas", {
      studentStudyProblemId: payload.studentStudyProblemId,
      line: payload.line,
    })
    .then(({ data }) => data);

const useCanvasPost = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("그림을 보내자!", data);
    },
    onMutate(variables) {
      console.log("variables", variables);
    },
  });
};

export default useCanvasPost;
