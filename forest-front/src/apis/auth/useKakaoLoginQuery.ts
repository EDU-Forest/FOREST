import customAxios from "@/utils/customAxios";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = () =>
  customAxios.get("/api/oauth2/authorization/kakao").then((res) => {
    return res;
  });

const useKakaoLoginQuery = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return useQuery([queryKeys.KAKAO_LOGIN], () => fetcher(), {
    refetchOnWindowFocus: false,
  });
};

export default useKakaoLoginQuery;
