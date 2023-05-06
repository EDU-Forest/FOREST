import studyAxios from "@/utils/customAxios/studyAxios";
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
