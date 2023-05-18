import * as queryKeys from "@/constants/queryKeys";
import workbookAxios from "@/utils/customAxios/workbookAxios";
import { useMutation, useQueryClient } from "react-query";

interface IData {
  workbookId: string;
  problemList: {
    problemNo: number;
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
  await workbookAxios.post(`/wb/problem`, data).then(({ data }) => {
    return data;
  });

const useSaveEditedWorkbookPost = () => {
  const queryClient = useQueryClient();

  return useMutation(fetcher, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKeys.GET_WORKBOOK_DETAIL);
    },
  });
};

export default useSaveEditedWorkbookPost;
