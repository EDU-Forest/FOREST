import { Signup } from "@/types/Auth";
import authAxios from "@/utils/customAxios/authAxios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

const fetcher = (payload: Signup) =>
  authAxios
    .post(`/api/user/common`, {
      email: payload.email,
      name: payload.username,
      phone: payload.phoneNumber,
      birth: payload.birth,
      pw: payload.password,
      pw2: payload.checkPassword,
      role: payload.role,
      provider: "LOCAL",
    })
    .then(({ data }) => data);

const useSignup = () => {
  const router = useRouter();

  return useMutation(fetcher, {
    onSuccess: () => {
      router.push("/login");
    },
    onError: (data) => {},
  });
};

export default useSignup;
