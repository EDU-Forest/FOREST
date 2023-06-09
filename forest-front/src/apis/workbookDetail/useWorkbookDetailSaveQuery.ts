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
  await workbookAxios.patch(`/wb`, data).then(({ data }) => {
    return data.data;
  });

const useWorkbookDetailSaveQuery = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {},
  });
};

export default useWorkbookDetailSaveQuery;
