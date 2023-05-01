import authAxios from "@/utils/authAxios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

const fetcher = (payload: KakaoLoginMoreInfo) =>
  authAxios
    .post(`/api/user/social`, {
      name: payload.username,
      phone: payload.phoneNumber,
      birth: payload.birth,
      role: payload.role,
      provider: "KAKAO",
    })
    .then(({ data }) => data);

const useKakaoLoginMoreInfo = () => {
  const router = useRouter();

  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem("forest_access_token", data.accessToken);
      router.push(`/${data.role === Role.TEACHER ? "teacher" : "student"}/dashboard`);
    },
    onError: (data) => {
      console.log("Err", data);
      // 아직 미구현
    },
  });
};

export default useKakaoLoginMoreInfo;
