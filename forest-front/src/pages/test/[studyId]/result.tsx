import useGetStudyProblems from "@/apis/study/useGetStudyProblemsQuery";
import TestHeader from "@/features/test/index/TestHeader";
import TestResultSection from "@/features/test/result/TestResultSection";
import { ResultContainer } from "@/features/test/result/TextResult.style";
import { setPage, setTestStudyId } from "@/stores/exam/exam";
import withAuth from "@/utils/auth/withAuth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface Iprops {
  studyId: number;
}

function Result({ studyId }: Iprops) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPage("result"));
    dispatch(setTestStudyId(studyId));
  }, []);

  return (
    <ResultContainer>
      <TestHeader />
      <TestResultSection />
    </ResultContainer>
  );
}

export default withAuth(Result);

export async function getServerSideProps({ params: { studyId } }: { params: { studyId: string } }) {
  return {
    props: { studyId: parseInt(studyId) },
  };
}
