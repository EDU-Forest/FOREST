import { setToastAnimation, setToastState } from "@/stores/toast/toast";
import { Login } from "@/types/Auth";
import beforeAuthAxios from "@/utils/customAxios/beforeAuthAxios";
import { setLocalStorage } from "@/utils/localStorage";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";

const fetcher = (payload: Login) =>
  beforeAuthAxios
    .post(`/api/user/login`, {
      email: payload.email,
      pw: payload.password,
    })
    .then(({ data }) => {
      return data;
    });

const useLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return useMutation(fetcher, {
    onSuccess: (data) => {
      const { name, role, accessToken } = data.data;
      setLocalStorage("forest_access_token", accessToken);
      router.push({ pathname: `/login/success`, query: { name, role, accessToken } });
    },
    onError: (error: AxiosError) => {
      if (error.code === "ERR_BAD_REQUEST") {
        dispatch(setToastAnimation("toast-alert openAnimation"));
        dispatch(setToastState(true));
      }
    },
  });
};

export default useLogin;
