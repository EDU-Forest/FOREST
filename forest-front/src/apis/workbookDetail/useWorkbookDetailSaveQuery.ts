import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation } from "react-query";

interface DataType {
  workbookInfo: {
    workbookId: number;
    title: string;
    workbookImgId: number | string;
    description: string;
  };
  problemList: {
    problemId: number;
    problemNum: number;
  }[];
}

const fetcher = async (data: DataType) =>
  await workbookAxios.patch(`/api/workbook`, data).then(({ data }) => {
    return data.data;
  });

const useWorkbookDetailSaveQuery = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {
      console.log("저장 성공 post", data);
    },
  });
};

export default useWorkbookDetailSaveQuery;
