import { setRole, setUsername } from "@/stores/user/user";
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
      console.log(data);
      return data;
    });

const useLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return useMutation(fetcher, {
    onSuccess: (data) => {
      dispatch(setUsername(data.data.name));
      dispatch(setRole(data.data.role));
      setLocalStorage("forest_access_token", data.data.accessToken);
      router.push(`/${data.data.role === "TEACHER" ? "teacher" : "student"}/dashboard`);
    },
    onError: (error) => {
      // 아직 미구현
      console.log("--useLogin error--", error);
    },
  });
};

export default useLogin;
