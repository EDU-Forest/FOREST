import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import workbookAxios from "@/utils/customAxios/workbookAxios";

interface Payload {
  classId: number;
  type: string;
}

const fetcher = ({ classId, type }: Payload) =>
  workbookAxios
    .get(`/api/workbook/class/${classId}`, { params: { search: type } })
    .then(({ data }) => data.data);

// 클래스 내 문제집 목록 조회 - OK
const useClassWorkbookListQuery = (classId: number, type: string) => {
  return useQuery(
    [queryKeys.CLASS_WORKBOOK_LIST, classId, type],
    () => fetcher({ classId, type }),
    {
      enabled: !!classId,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log("클래스 내 문제집 ", data);
      },
    },
  );
};

export default useClassWorkbookListQuery;
