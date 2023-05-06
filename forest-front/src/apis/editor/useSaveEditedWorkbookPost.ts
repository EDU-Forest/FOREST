import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation } from "react-query";

interface IData {
  workbookId: string;
  problemList: {
    problemNo: string;
    type: string;
    title: string;
    path: string;
    text: string;
    answer: string;
    point: number;
    itemList: {
      itemNo: number;
      content: string;
      isImage: boolean;
    }[];
  }[];
  deleteItemList: {
    itemId: number;
  }[];
}

const fetcher = async (data: IData) =>
  await workbookAxios.post(`/api/workbook/problem`, data).then(({ data }) => {
    return data;
  });

const useSaveEditedWorkbookPost = () => {
  return useMutation(fetcher, {
    onSuccess: (data) => {},
  });
};

export default useSaveEditedWorkbookPost;
