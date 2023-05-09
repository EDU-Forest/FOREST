import { setEndStudy } from "@/stores/exam/exam";
import studyAxios from "@/utils/customAxios/studyAxios";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";

const fetcher = (studyId: number) =>
  studyAxios.patch("/api/study/exit/student", { studyId }).then(({ data }) => data);

const useEndStudy = () => {
  const dispatch = useDispatch();
  return useMutation(fetcher, {
    onSuccess: () => {
      dispatch(setEndStudy());
    },
    onError: () => {},
  });
};

export default useEndStudy;
