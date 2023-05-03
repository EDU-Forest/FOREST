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

// 클래스 내 문제집 목록 조회 - API 구현 이전
const useClassWorkbookListQuery = (classId: number, type: string) => {
  return useQuery([queryKeys.CLASS_WORKBOOK_LIST, classId], () => fetcher({ classId, type }), {
    enabled: !!classId,
    onSuccess: (data) => {
      console.log("리스트", data);
    },
  });
};

export default useClassWorkbookListQuery;
