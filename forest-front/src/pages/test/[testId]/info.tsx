import TestInfoContainer from "@/features/test/info/TestInfoContainer";
import { FullScreen } from "@/styles/container";
import { useRouter } from "next/router";

export default function TestInfo() {
  const router = useRouter();
  console.log(router);
  return (
    <FullScreen>
      <TestInfoContainer />
    </FullScreen>
  );
}

export async function getServerSideProps({ params: { id } }: { params: { id: string } }) {
  return {
    props: {},
  };
}
