import TestContent from "@/features/test/index/TestContent";
import TestHeader from "@/features/test/index/TestHeader";
import { StyledTestContainer } from "@/features/test/index/TextIndex.style";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useGetStudyProblems from "@/apis/study/useGetStudyProblemsQuery";

export default function Test() {
  const router = useRouter();
  const studyId = router.query?.studyId;
  useGetStudyProblems({ studyId: typeof studyId === "string" ? parseInt(studyId) : -1 });
  return (
    <StyledTestContainer>
      <TestHeader />
      <TestContent />
    </StyledTestContainer>
  );
}

export async function getServerSideProps({ params: { id } }: { params: { id: string } }) {
  return {
    props: {},
  };
}
