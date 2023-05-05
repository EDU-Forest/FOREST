import TestHeader from "@/features/test/index/TestHeader";
import TestResultQuestion from "@/features/test/result/TestResultQuestion";
import TestResultTotal from "@/features/test/result/TestResultTotal";
import { ResultContainer, TestResultOkBtn } from "@/features/test/result/TextResult.style";
import { RootState } from "@/stores/store";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Result() {
  const router = useRouter();
  const { role } = useSelector((state: RootState) => state.user);
  const clickHandler = () => {
    router.push(`/${role.toLowerCase()}/dashboard`);
  };
  return (
    <ResultContainer>
      <TestHeader page={"result"} />
      <TestResultTotal />
      <TestResultQuestion />
      <TestResultOkBtn onClick={clickHandler}>확인</TestResultOkBtn>
    </ResultContainer>
  );
}

export async function getServerSideProps({ params: { id } }: { params: { id: string } }) {
  return {
    props: {},
  };
}
