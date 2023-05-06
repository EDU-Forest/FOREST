import useGetStudyProblems from "@/apis/study/useGetStudyProblemsQuery";
import TestHeader from "@/features/test/index/TestHeader";
import TestResultQuestion from "@/features/test/result/TestResultQuestion";
import TestResultTotal from "@/features/test/result/TestResultTotal";
import { ResultContainer, TestResultOkBtn } from "@/features/test/result/TextResult.style";
import { RootState } from "@/stores/store";
import withAuth from "@/utils/auth/withAuth";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function Result() {
  const router = useRouter();
  const studyId = router.query.studyId;
  const { role } = useSelector((state: RootState) => state.user);
  useGetStudyProblems(typeof studyId === "string" ? parseInt(studyId) : -1);
  const clickHandler = () => {
    router.push(`/${role.toLowerCase()}/dashboard`);
  };
  return (
    <ResultContainer>
      <TestHeader page={"result"} />
      <TestResultTotal />
      <TestResultQuestion />
      <TestResultOkBtn onClick={clickHandler}>확인</TestResultOkBtn>
    </ResultContainer>
  );
}

export default withAuth(Result);

export async function getServerSideProps({ params: { id } }: { params: { id: string } }) {
  return {
    props: {},
  };
}
