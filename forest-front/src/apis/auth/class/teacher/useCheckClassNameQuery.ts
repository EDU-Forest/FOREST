import authAxios from "@/utils/authAxios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

interface Iprops {
  className: string;
  setErrorMsg: (msg: string) => void;
}
const fetcher = (className: string) => {
  authAxios
    .get("/api/class/search", {
      params: {
        className,
      },
    })
    .then((res) => {
      res;
    });
};

const useCheckClassNameQuery = ({ className, setErrorMsg }: Iprops) => {
  return useQuery([queryKeys.CHECK_CLASSNAME, className], () => fetcher(className), {
    enabled: !!className,
    onSuccess: (res) => {
      console.log("성공", res);
      // if (res.status === "AUTH_CLASS_NAME_NOT_DUPLICATED") {
      //   setErrorMsg("");
      //   return;
      // } else if (res.status === "AUTH_CLASS_NAME_DUPLICATED") {
      //   setErrorMsg("중복된 클래스 이름입니다.");
      // }
    },
    onError: () => {
      setErrorMsg("입력값이 올바르지 않습니다.");
    },
  });
};

export default useCheckClassNameQuery;
