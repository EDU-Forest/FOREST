import { setRole, setUsername } from "@/stores/user/user";
import axios from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";

const fetcher = (payload: Login) =>
  axios
    .post(`/api/user/login`, {
      email: payload.email,
      password: payload.password,
    })
    .then(({ data }) => data);

const useLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return useMutation(fetcher, {
    onSuccess: (data) => {
      dispatch(setUsername(data.name));
      dispatch(setRole(data.role));
      localStorage.setItem("forest_access_token", data.accessToken);
      router.push(`/${data.role === Role.TEACHER ? "teacher" : "student"}/dashboard`);
    },
  });
};
