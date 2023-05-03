import TestContent from "@/features/test/index/TestContent";
import TestHeader from "@/features/test/index/TestHeader";
import { StyledTestContainer } from "@/features/test/index/TextIndex.style";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useGetStudyProblems from "@/apis/study/useGetStudyProblemsQuery";
import TestEndModal from "@/features/test/index/TestEndModal";

export default function Test() {
  const router = useRouter();
  const studyId = router.query?.studyId;
  const [toggleModal, setToggleModal] = useState(false);

  useGetStudyProblems({ studyId: typeof studyId === "string" ? parseInt(studyId) : -1 });

  return (
    <StyledTestContainer>
      {toggleModal && <TestEndModal setToggleModal={setToggleModal} />}
      <TestHeader />
      <TestContent toggleModal={toggleModal} setToggleModal={setToggleModal} />
    </StyledTestContainer>
  );
}

export async function getServerSideProps({ params: { id } }: { params: { id: string } }) {
  return {
    props: {},
  };
}
