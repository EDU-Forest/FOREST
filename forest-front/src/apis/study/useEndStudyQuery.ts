import studyAxios from "@/utils/customAxios/studyAxios";
import { useMutation } from "react-query";

const fetcher = (studyId: number) =>
  studyAxios.patch("/study/exit/student", { studyId }).then(({ data }) => data);

const useEndStudy = () => {
  return useMutation(fetcher, {
    onSuccess: () => {},
    onError: () => {},
  });
};

export default useEndStudy;
