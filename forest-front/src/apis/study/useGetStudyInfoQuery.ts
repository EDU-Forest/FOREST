import studyAxios from "@/utils/studyAxios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { getTimeLimit } from "@/utils";

interface Iprops {
  studyId: number;
  setStudyInfoData: (data: IStudyInfo) => void;
}

const fetcher = (studyId: number) =>
  studyAxios.get(`/api/study/info/${studyId}`).then(({ data }) => {
    console.log(data);
    return data;
  });

const useGetStudyInfo = ({ studyId, setStudyInfoData }: Iprops) => {
  return useQuery(queryKeys.STUDY_INFO, () => fetcher(studyId), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setStudyInfoData({
        studyTitle: data.title,
        studyPresenter: data.name,
        studyVolume: data.volume,
        studyTimeLimit: getTimeLimit(data.startTime, data.endTime),
      });
    },
    onError: (error) => {
      console.log("--useGetStudyInfoError --", error);
    },
  });
};

export default useGetStudyInfo;
