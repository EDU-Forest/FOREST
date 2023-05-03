import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import authAxios from "@/utils/authAxios";

interface Iprops {
  className: string;
  setErrorMsg: (msg: string) => void;
  setIsAvailable: (status: boolean) => void;
}

const fetcher = (className: string) =>
  authAxios
    .get("/api/class/search", {
      params: {
        className,
      },
    })
    .then(({ data }) => data);

// 클래스 이름 중복 검사 - OK
const useCheckClassNameQuery = ({ className, setErrorMsg, setIsAvailable }: Iprops) => {
  return useQuery([queryKeys.CHECK_CLASSNAME, className], () => fetcher(className), {
    enabled: !!className,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (data.status === "AUTH_CLASS_NAME_NOT_DUPLICATED") {
        setErrorMsg("");
        setIsAvailable(true);
        return;
      } else if (data.status === "AUTH_CLASS_NAME_DUPLICATED") {
        setErrorMsg("중복된 클래스 이름입니다.");
        setIsAvailable(false);
      }
    },
    onError: () => {
      setErrorMsg("입력값이 올바르지 않습니다.");
      setIsAvailable(false);
    },
  });
};

export default useCheckClassNameQuery;
