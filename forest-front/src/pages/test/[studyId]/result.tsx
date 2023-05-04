import TestHeader from "@/features/test/index/TestHeader";
import TestResultQuestion from "@/features/test/result/TestResultQuestion";
import TestResultTotal from "@/features/test/result/TestResultTotal";
import { ResultContainer, TestResultOkBtn } from "@/features/test/result/TextResult.style";
import { useRouter } from "next/router";

export default function Result() {
  const router = useRouter();
  const workbookId = router.query.id;
  return (
    <ResultContainer>
      <TestHeader page={"result"} />
      <TestResultTotal />
      <TestResultQuestion />
      <TestResultOkBtn>확인</TestResultOkBtn>
    </ResultContainer>
  );
}

export async function getServerSideProps({ params: { id } }: { params: { id: string } }) {
  return {
    props: {},
  };
}
