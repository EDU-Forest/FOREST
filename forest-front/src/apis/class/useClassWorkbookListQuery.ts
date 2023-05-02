import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import workbookAxios from "@/utils/workbookAxios";

interface Payload {
  classId: number;
  type: string;
}

const fetcher = ({ classId, type }: Payload) =>
  workbookAxios
    .get(`/api/workbook/${classId}`, { params: { sort: type } })
    .then(({ data }) => data);

const useClassWorkbookListQuery = (classId: number, type: string) => {
  return useQuery([queryKeys.CLASS_WORKBOOK_LIST, classId], () => fetcher({ classId, type }), {
    enabled: !!classId,
    onSuccess: (data) => {
      console.log("리스트", data);
    },
  });
};

export default useClassWorkbookListQuery;
