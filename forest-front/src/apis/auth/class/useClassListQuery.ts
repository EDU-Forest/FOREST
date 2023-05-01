import authAxios from "@/utils/authAxios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";

const fetcher = () => {
  authAxios.get("/api/class").then((res) => {
    return res.data;
  });
};

const useClassListQuery = () => {
  return (
    useQuery([queryKeys.CLASS_LIST]),
    fetcher,
    {
      refetchOnWindowFocus: false,
    }
  );
};

export default useClassListQuery;
