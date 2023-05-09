import { setRole, setUsername } from "@/stores/user/user";
import { Login } from "@/types/Login";
import beforeAuthAxios from "@/utils/customAxios/beforeAuthAxios";
import { setLocalStorage } from "@/utils/localStorage";
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

  return useMutation(fetcher, {
    onSuccess: (data) => {
      const { name, role, accessToken } = data.data;
      setLocalStorage("forest_access_token", accessToken);
      // router.push(`/login/success`, { query: { name, role, accessToken } });
      router.push({ pathname: `/login/success`, query: { name, role, accessToken } });
    },
    onError: (error) => {
      // 아직 미구현
      console.log("--useLogin error--", error);
    },
  });
};

export default useLogin;
