import { closeCanvas } from "@/stores/exam/canvas";
import { setPage, setStudyStart } from "@/stores/exam/exam";
import studyAxios from "@/utils/customAxios/studyAxios";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";

const fetcher = (studyId: number) =>
  studyAxios.post("/study/start", { studyId }).then(({ data }) => {
    return data;
  });

const useStartStudy = () => {
  const dispatch = useDispatch();
  return useMutation(fetcher, {
    onSuccess: () => {
      dispatch(setStudyStart());
      dispatch(closeCanvas());
      dispatch(setPage("study"));
      // 문제 생성 완료(code: 201) 및 재입장 완료(code: 200)의 경우
      // 클라이언트에서 해줄 일은 동일하다.
    },
    onError: (error) => {},
  });
};

export default useStartStudy;
