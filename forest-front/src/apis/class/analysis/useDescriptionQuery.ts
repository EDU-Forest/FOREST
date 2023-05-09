import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import studyAxios from "@/utils/customAxios/studyAxios";
import { Descript } from "@/types/Descript";

interface Description {
  count: number;
  descript: Descript[];
}

const fetcher = (studyId: number) =>
  studyAxios.get(`/api/study/descript/${studyId}`).then(({ data }) => {
    // const descript = data.data as Description;
    // return descript;
    return data;
  });

const useDescriptionQuery = (studyId: number) => {
  return useQuery([queryKeys.DESCRIPTION, studyId], () => fetcher(studyId), {
    refetchOnWindowFocus: false,
    enabled: !!studyId,
    onSuccess: (data) => {
      console.log("서술형", data);
    },
  });
};

export default useDescriptionQuery;
