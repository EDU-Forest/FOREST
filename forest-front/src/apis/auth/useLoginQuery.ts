import { Login } from "@/types/Auth";
import beforeAuthAxios from "@/utils/customAxios/beforeAuthAxios";
import { setLocalStorage } from "@/utils/localStorage";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

const fetcher = (payload: Login) =>
  beforeAuthAxios
    .post(`/api/user/login`, {
      email: payload.email,
      pw: payload.password,
    })
    .then(({ data }) => {
      return data;
    });

const useLogin = (setIsError: (isError: boolean) => void) => {
  const router = useRouter();

  return useMutation(fetcher, {
    onSuccess: (data) => {
      const { name, role, accessToken } = data.data;
      setLocalStorage("forest_access_token", accessToken);
      router.push({ pathname: `/login/success`, query: { name, role, accessToken } });
    },
    onError: (error: AxiosError) => {
      if (error.code === "ERR_BAD_REQUEST") {
        setIsError(true);
      }
    },
  });
};

export default useLogin;
