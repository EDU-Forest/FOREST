import beforeAuthAxios from "@/utils/customAxios/beforeAuthAxios";
import * as queryKeys from "@/constants/queryKeys";
import { useQuery } from "react-query";
import { checkEmail } from "@/utils";
import { AuthValidation } from "@/types/AuthValidation";

interface Iprops {
  email: string;
  validation: AuthValidation;
  setValidation: (validation: AuthValidation) => void;
}

const fetcher = (email: string) =>
  beforeAuthAxios.get("/api/user/check", { params: { email: email } }).then(({ data }) => data);

const useCheckEmail = ({ email, validation, setValidation }: Iprops) => {
  return useQuery([queryKeys.CHECK_EMAIL, validation.email], () => fetcher(email), {
    enabled: !!validation.email,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setValidation({
        ...validation,
        email: checkEmail(email.trim()) ? "pass" : "fail",
        emailDuplicate: data.status === "AUTH_EMAIL_NOT_DUPLICATED" ? "pass" : "fail",
      });
    },
    onError: (error) => {
      console.log("checkEmailError", error);
    },
  });
};

export default useCheckEmail;
