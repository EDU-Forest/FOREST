import AnswerBox from "@/features/test/index/TestAnswerBox";
import TestContent from "@/features/test/index/TestContent";
import TestHeader from "@/features/test/index/TestHeader";
import { StyledTestContainer } from "@/features/test/index/TextIndex.style";
import { RootState } from "@/stores/store";
import { FullScreen } from "@/styles/container";
import { getSessionStorage } from "@/utils/sessionStorage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Test() {
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