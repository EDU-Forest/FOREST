import useGetStudyProblems from "@/apis/study/useGetStudyProblemsQuery";
import TestInfoContainer from "@/features/test/info/TestInfoContainer";
import { setStudyInfo, setinitProblem } from "@/stores/exam/exam";
import { FullScreen } from "@/styles/container";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import withAuth from "@/utils/withAuth";

function TestInfo() {
  const dispatch = useDispatch();
  const router = useRouter();
  const studyId = router.query.studyId;
  useGetStudyProblems(typeof studyId === "string" ? parseInt(studyId) : -1);

  useEffect(() => {
    dispatch(setinitProblem());
  }, []);

  return (
    <FullScreen>
      <TestInfoContainer />
    </FullScreen>
  );
}

export default withAuth(TestInfo);

export async function getServerSideProps({ params: { studyId } }: { params: { studyId: string } }) {
  return {
    props: {},
  };
}
