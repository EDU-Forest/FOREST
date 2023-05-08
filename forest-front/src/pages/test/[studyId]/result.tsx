import useGetStudyProblems from "@/apis/study/useGetStudyProblemsQuery";
import TestHeader from "@/features/test/index/TestHeader";
import TestResultQuestion from "@/features/test/result/TestResultQuestion";
import TestResultSection from "@/features/test/result/TestResultSection";
import TestResultTotal from "@/features/test/result/TestResultTotal";
import { ResultContainer, TestResultOkBtn } from "@/features/test/result/TextResult.style";
import { RootState } from "@/stores/store";
import withAuth from "@/utils/auth/withAuth";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function Result() {
  const router = useRouter();
  const studyId = router.query.studyId;
  useGetStudyProblems(typeof studyId === "string" ? parseInt(studyId) : -1);

  return (
    <ResultContainer>
      <TestHeader page={"result"} />
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
