import workbookAxios from "@/utils/workbookAxios";
import * as queryKeys from "@/constants/queryKeys";
import { useQuery } from "react-query";
import { IWorkbookBySelf } from "@/types/Workbook";

interface Iprops {
  setWorkbooksBySelf: (workbooksBySelf: IWorkbookBySelf[]) => void;
}

const fetcher = () => workbookAxios.get("/api/workbook/editor").then(({ data }) => data);

const useGetWorkbooksBySelf = ({ setWorkbooksBySelf }: Iprops) => {
  return useQuery(queryKeys.WORKBOOKS_BY_SELF, () => fetcher(), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      // 연결 시 수정해야 할 듯
      setWorkbooksBySelf(data.data);
    },
  });
};

export default useGetWorkbooksBySelf;
