import studyAxios from "@/utils/customAxios/studyAxios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { useDispatch } from "react-redux";
import { setStudyInfo } from "@/stores/exam/exam";

interface Iprops {
  studyId: number;
}

const fetcher = (studyId: number) =>
  studyAxios
    .get(`/api/study/info/${studyId}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {});

const useGetStudyInfo = ({ studyId }: Iprops) => {
  const dispatch = useDispatch();
  return useQuery(queryKeys.STUDY_INFO, () => fetcher(studyId), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      dispatch(setStudyInfo(data.data));
    },
    onError: (error) => {},
  });
};

export default useGetStudyInfo;
