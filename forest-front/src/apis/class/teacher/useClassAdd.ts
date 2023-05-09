import authAxios from "@/utils/customAxios/authAxios";
import { useMutation, useQueryClient } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useDispatch } from "react-redux";
import { closeAddClassModal } from "@/stores/class/classModal";
import { setClass } from "@/stores/class/classInfo";
import { IClassList } from "@/types/ClassList";

const fetcher = (name: string) =>
  authAxios.post("/api/class", { name }).then(({ data }) => {
    const classInfo: IClassList = data.data;
    return classInfo;
  });

// 클래스 추가 - OK
const useClassAdd = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: (classInfo) => {
      dispatch(closeAddClassModal());
      dispatch(setClass(classInfo));
      return queryClient.invalidateQueries(queryKeys.CLASS_LIST);
    },
  });
};

export default useClassAdd;
