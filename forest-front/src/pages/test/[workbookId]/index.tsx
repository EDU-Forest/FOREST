import TestContent from "@/features/test/index/TestContent";
import TestHeader from "@/features/test/index/TestHeader";
import { StyledTestContainer } from "@/features/test/index/TextIndex.style";
import { useEffect, useState } from "react";

export default function Test() {
  useEffect(() => {}, []);
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
