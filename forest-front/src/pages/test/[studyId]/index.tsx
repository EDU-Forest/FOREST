import TestContent from "@/features/test/index/TestContent";
import TestHeader from "@/features/test/index/TestHeader";
import { StyledTestContainer } from "@/features/test/index/TextIndex.style";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TestEndModal from "@/features/test/index/TestEndModal";

export default function Test() {
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <StyledTestContainer>
      {toggleModal && <TestEndModal setToggleModal={setToggleModal} />}
      <TestHeader page={"study"} setToggleModal={setToggleModal} />
      <TestContent toggleModal={toggleModal} setToggleModal={setToggleModal} />
    </StyledTestContainer>
  );
}

export async function getServerSideProps({ params: { id } }: { params: { id: string } }) {
  return {
    props: {},
  };
}
