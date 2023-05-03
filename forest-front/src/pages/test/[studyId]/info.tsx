import TestInfoContainer from "@/features/test/info/TestInfoContainer";
import { FullScreen } from "@/styles/container";

export default function TestInfo() {
  return (
    <FullScreen>
      <TestInfoContainer />
    </FullScreen>
  );
}

export async function getServerSideProps({ params: { studyId } }: { params: { studyId: string } }) {
  return {
    props: {},
  };
}
