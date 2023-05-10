import useGetStudyProblems from "@/apis/study/useGetStudyProblemsQuery";
import TestHeader from "@/features/test/index/TestHeader";
import TestResultSection from "@/features/test/result/TestResultSection";
import { ResultContainer } from "@/features/test/result/TextResult.style";
import { setPage } from "@/stores/exam/exam";
import withAuth from "@/utils/auth/withAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function Result() {
  const router = useRouter();
  const dispatch = useDispatch();
  const studyId = router.query.studyId;
  useGetStudyProblems(typeof studyId === "string" ? parseInt(studyId) : -1);

  useEffect(() => {
    dispatch(setPage("result"));
  }, []);

  return (
    <ResultContainer>
      <TestHeader />
      <TestResultSection />
    </ResultContainer>
  );
}

export default withAuth(Result);

export async function getServerSideProps({ params: { id } }: { params: { id: string } }) {
  return {
    props: {},
  };
}
