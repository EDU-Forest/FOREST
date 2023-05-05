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

const fetcher = async (wId: number) =>
  await workbookAxios.delete(`/api/workbook/{workbookId}`).then(({ data }) => {
    return data.data;
  });

const useWorkbookDetailDeleteQuery = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("저장 성공 post", data);
    },
  });
};

export default useWorkbookDetailDeleteQuery;
