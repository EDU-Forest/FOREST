import studyAxios from "@/utils/studyAxios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

const fetcher = (studyId: number) =>
  studyAxios.post("/api/study/start", { studyId }).then(({ data }) => data);

const useStartStudy = (studyId: number) => {
  const router = useRouter();
  return useMutation(fetcher, {
    onSuccess: () => {
      // 문제 생성 완료(code: 201) 및 재입장 완료(code: 200)의 경우
      // 클라이언트에서 해줄 일은 동일하다.
      router.push(`/test/${studyId}`);
    },
    onError: (error) => {
      console.log("--useStartStudyError--", error);
    },
  });
};

export default useStartStudy;
