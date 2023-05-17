import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/customAxios/studyAxios";
import { Descript } from "@/types/Descript";

interface Iprops {
  studyId: number;
  setCount: (count: number) => void;
}

const fetcher = (studyId: number) =>
  studyAxios
    .get(`/study/descript/${studyId}`, {
      timeout: 100000,
    })
    .then(({ data }) => {
      const count: number = data?.data.count;
      const descript: Descript[] = data?.data.descript;
      const status: string = data.status;
      return { count, descript, status };
    });

const useDescriptionQuery = ({ studyId, setCount }: Iprops) => {
  return useQuery([queryKeys.DESCRIPTION, studyId], () => fetcher(studyId), {
    refetchOnWindowFocus: false,
    enabled: !!studyId,
    onSuccess: (data) => {
      setCount(data.count);
    },
  });
};

export default useDescriptionQuery;
