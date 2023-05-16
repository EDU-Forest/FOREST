import TestContent from "@/features/test/index/TestContent";
import TestHeader from "@/features/test/index/TestHeader";
import { StyledTestContainer } from "@/features/test/index/TextIndex.style";
import TestEndModal from "@/features/test/index/TestEndModal";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import TestEnd from "@/features/test/index/TestEnd";
import withAuth from "@/utils/auth/withAuth";
import useGetStudyProblems from "@/apis/study/useGetStudyProblemsQuery";
import Loading from "@/components/Loading/Loading";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToggleModal } from "@/stores/exam/exam";

interface Iprops {
  studyId: number;
}

function Test({ studyId }: Iprops) {
  const { isSubmitted, toggleModal, isGraded, isTimeOut, endTime } = useSelector(
    (state: RootState) => state.exam,
  );
  const { isLoading } = useGetStudyProblems(studyId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setToggleModal(false));
  }, []);

  return (
    <StyledTestContainer>
      {isLoading ? (
        <Loading width={12} height={12} />
      ) : (
        <>
          {toggleModal && <TestEndModal />}
          <TestHeader />
          {endTime && isTimeOut && !isSubmitted ? <TestEnd /> : <TestContent />}
        </>
      )}
    </StyledTestContainer>
  );
}

export default withAuth(Test);

export async function getServerSideProps({ params: { studyId } }: { params: { studyId: string } }) {
  return {
    props: { studyId: parseInt(studyId) },
  };
}
