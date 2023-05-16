import { setRole, setUsername } from "@/stores/user/user";
import authAxios from "@/utils/customAxios/authAxios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { KakaoLoginMoreInfo } from "@/types/KakaoLoginMoreInfo";

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
  const dispatch = useDispatch();
  const router = useRouter();

  return useMutation(fetcher, {
    onSuccess: (data) => {
      dispatch(setUsername(data.data.name));
      dispatch(setRole(data.data.role));
      router.push(`/${data.data.role === "TEACHER" ? "teacher" : "student"}/dashboard`, undefined, {
        shallow: true,
      });
    },
    onError: (data) => {},
  });
};

export default useKakaoLoginMoreInfo;
