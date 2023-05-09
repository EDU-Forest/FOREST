import studyAxios from "@/utils/customAxios/studyAxios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { IQuestionResult } from "@/types/Exam";

interface Iprops {
  studyId: number;
  setQuestionResult: (questionResult: IQuestionResult[]) => void;
}

const fetcher = (studyId: number) =>
  studyAxios.get(`/api/study/student/result/question/${studyId}`).then(({ data }) => {
    console.log(data);
    return data;
  });

const useGetQuestionAnswer = ({ studyId, setQuestionResult }: Iprops) => {
  return useQuery(queryKeys.STUDY_QUESTION_ANSWER, () => fetcher(studyId), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setQuestionResult(data.data.studentStudyProblemResultList);
    },
  });
};

export default useGetQuestionAnswer;
