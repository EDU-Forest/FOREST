import { setPaths } from "@/stores/exam/canvas";
import studyAxios from "@/utils/customAxios/studyAxios";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";

interface Payload {
  studentStudyProblemId: number;
  line: object;
}

const fetcher = (payload: Payload) =>
  studyAxios
    .post("/study/canvas", {
      studentStudyProblemId: payload.studentStudyProblemId,
      line: payload.line,
    })
    .then(({ data }) => data);

const useCanvasPost = () => {
  const dispatch = useDispatch();
  return useMutation(fetcher, {
    onSuccess: (data) => {
      dispatch(setPaths([]));
    },
  });
};

export default useCanvasPost;
