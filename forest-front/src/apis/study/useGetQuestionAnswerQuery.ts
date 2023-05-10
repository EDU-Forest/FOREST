import studyAxios from "@/utils/customAxios/studyAxios";
import { useQuery } from "react-query";
import * as queryKeys from "@/constants/queryKeys";
import { IQuestionResult } from "@/types/Exam";
import { IStudentStudyProblemResultList } from "@/types/Study";

interface Iprops {
  studyId: number;
  setQuestionResult: (questionResult: IQuestionResult[]) => void;
}

const fetcher = (studyId: number) =>
  studyAxios.get(`/api/study/student/result/question/${studyId}`).then(({ data }) => {
    const studentStudyProblemResultList: IStudentStudyProblemResultList[] = data.data;
    return studentStudyProblemResultList;
  });

const useGetQuestionAnswer = (studyId: number) => {
  return useQuery(queryKeys.STUDY_QUESTION_ANSWER, () => fetcher(studyId), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log("각각의 문제");
    },
  });
};

export default useGetQuestionAnswer;
