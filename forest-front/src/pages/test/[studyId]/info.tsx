import TestInfoContainer from "@/features/test/info/TestInfoContainer";
import { setinitProblem } from "@/stores/exam/exam";
import { FullScreen } from "@/styles/container";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import withAuth from "@/utils/auth/withAuth";

function TestInfo() {
  const dispatch = useDispatch();

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
