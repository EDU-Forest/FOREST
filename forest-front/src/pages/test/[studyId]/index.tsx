import TestContent from "@/features/test/index/TestContent";
import TestHeader from "@/features/test/index/TestHeader";
import { StyledTestContainer } from "@/features/test/index/TextIndex.style";
import { useRouter } from "next/router";
import TestEndModal from "@/features/test/index/TestEndModal";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import TestEnd from "@/features/test/index/TestEnd";
import withAuth from "@/utils/auth/withAuth";
import useGetStudyProblems from "@/apis/study/useGetStudyProblemsQuery";

interface Iprops {
  studyId: number;
}

function Test({ studyId }: Iprops) {
  const { isSubmitted, toggleModal, isGraded } = useSelector((state: RootState) => state.exam);
  useGetStudyProblems(studyId);

  return (
    <StyledTestContainer>
      {toggleModal && <TestEndModal />}
      <TestHeader />
      {(isGraded && !isSubmitted) || (!isGraded && isSubmitted) ? <TestEnd /> : <TestContent />}
    </StyledTestContainer>
  );
}

export default withAuth(Test);

export async function getServerSideProps({ params: { studyId } }: { params: { studyId: string } }) {
  return {
    props: { studyId: parseInt(studyId) },
  };
}
