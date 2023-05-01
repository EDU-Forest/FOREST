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
    // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
    refetchOnWindowFocus: false,
  });
};

export default useKakaoLoginQuery;
