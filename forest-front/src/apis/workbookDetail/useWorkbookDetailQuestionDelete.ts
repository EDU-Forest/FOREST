import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation } from "react-query";

interface DataType {
  workbookInfo: {
    workbookId: number;
    title: string;
    workbookImgId: number;
    description: string;
  };
  problemList: {
    problemId: number;
    problemNum: number;
  }[];
}

const fetcher = async (pId: number) =>
  await workbookAxios.delete(`/wb/problem/${pId}`).then(({ data }) => {
    return data;
  });

const useWorkbookDetailQuestionDelete = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {},
  });
};

export default useWorkbookDetailQuestionDelete;
