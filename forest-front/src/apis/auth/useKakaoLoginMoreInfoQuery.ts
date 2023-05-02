import { setRole, setUsername } from "@/stores/user/user";
import authAxios from "@/utils/authAxios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";

const fetcher = (payload: KakaoLoginMoreInfo) =>
  authAxios
    .post(`/api/user/social`, {
      name: payload.username,
      phone: payload.phoneNumber,
      birth: payload.birth,
      role: payload.role,
      provider: "KAKAO",
    })
    .then(({ data }) => data.data);

const useKakaoLoginMoreInfo = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return useMutation(fetcher, {
    onSuccess: (data) => {
      dispatch(setUsername(data.name));
      dispatch(setRole(data.role));
      console.log("ff", data);
      router.push(`/${data.role === "TEACHER" ? "teacher" : "student"}/dashboard`);
    },
    onError: (data) => {
      console.log("Err", data);
      // 아직 미구현
    },
  });
};

export default useKakaoLoginMoreInfo;
