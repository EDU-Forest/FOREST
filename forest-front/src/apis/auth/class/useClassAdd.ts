import authAxios from "@/utils/authAxios";
import { useMutation } from "react-query";

// const fetcher = (name: string) => {
//   authAxios.post("/api/class", { name }).then(({ data }) => data);
// };

const useClassAdd = (name: string) => {
  return useMutation(() => authAxios.post("/api/class", { name }).then(({ data }) => data), {});
};

export default useClassAdd;
