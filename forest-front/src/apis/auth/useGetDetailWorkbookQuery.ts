import beforeAuthAxios from "@/utils/beforeAuthAxios";
import * as queryKeys from "@/constants/queryKeys";
import { useQuery } from "react-query";
import { checkEmail } from "@/utils";
import workbookAxios from "@/utils/workbookAxios";

interface Iprops {
  email: string;
  validation: AuthValidation;
  setValidation: (validation: AuthValidation) => void;
}

const fetcher = (studyId: string) =>
  workbookAxios.get(`/api/study/problem/${studyId}/${1}`).then(({ data }) => data);

const useGetDetailWorkbookQuery = (studyId: string) => {
  return useQuery([queryKeys.CHECK_EMAIL, validation.email], () => fetcher(email), {
    enabled: !!validation.email,
    refetchOnWindowFocus: false,
    onSuccess: () => {
      setValidation({
        ...validation,
        email: checkEmail(email.trim()) ? "pass" : "fail",
        emailDuplicate: "pass",
      });
    },
    onError: (error) => {
      console.log("checkEmailError", error);
    },
  });
};

export default useCheckEmailQuery;
