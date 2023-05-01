import { RootState } from "@/stores/store";
import customAxios from "@/utils/customAxios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";

const fetcher = (payload: KakaoLoginMoreInfo) =>
  customAxios
    .post(`/api/user/social`, {
      name: payload.username,
      phone: payload.phoneNumber,
      birth: payload.birth,
      role: payload.role,
      provider: "KAKAO",
    })
    .then(({ data }) => data);

const useKakaoLoginMoreInfo = () => {
  const { role } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  return useMutation(fetcher, {
    onSuccess: () => {
      router.push(`/${role}/dashboard`);
    },
    onError: (data) => {
      console.log("Err", data);
      // 아직 미구현
    },
  });
};

export default useKakaoLoginMoreInfo;
