import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import authAxios from "@/utils/authAxios";

const fetcher = () =>
  authAxios.get("/api/oauth2/authorization/kakao").then((res) => {
    return res;
  });
// console.log("ff");
// axios.get("/api/oauth2/authorization/kakao").then((res) => {
//   return res;
// });

const useKakaoLoginQuery = () => {
  return useQuery(queryKeys.KAKAO_LOGIN, fetcher, {
    refetchOnWindowFocus: false,
  });
};

export default useKakaoLoginQuery;
