import studyAxios from "@/utils/studyAxios";
import { useMutation } from "react-query";

const fetcher = (studyId: number) =>
  studyAxios.patch("/api/study/exit/student", { studyId }).then(({ data }) => data);

const useEndStudy = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {},
    onError: () => {},
  });
};

export default useEndStudy;
