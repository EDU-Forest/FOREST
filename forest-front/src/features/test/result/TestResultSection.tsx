import { useRouter } from "next/router";
import TestResultQuestion from "./TestResultQuestion";
import TestResultTotal from "./TestResultTotal";
import { TestResultOkBtn, TestResultSectionBox } from "./TextResult.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

export default function TestResultSection() {
  const router = useRouter();
  const { role } = useSelector((state: RootState) => state.user);

  const clickHandler = () => {
    router.push(`/${role.toLowerCase()}/class`);
  };

  return (
    <TestResultSectionBox>
      <TestResultTotal />
      <TestResultQuestion />
      <TestResultOkBtn onClick={clickHandler}>확인</TestResultOkBtn>
    </TestResultSectionBox>
  );
}
