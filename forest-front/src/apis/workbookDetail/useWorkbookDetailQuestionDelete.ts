import workbookAxios from "@/utils/workbookAxios";
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
  await workbookAxios.delete(`/api/workbook/problem/${pId}`).then(({ data }) => {
    return data;
  });

const useWorkbookDetailQuestionDelete = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("문제 삭제 성공 post", data);
    },
  });
};

export default useWorkbookDetailQuestionDelete;
