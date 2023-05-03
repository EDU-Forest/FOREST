import Lottie from "react-lottie-player";
import { NoClassText, NoClassWrapper, MakeClassBtn } from "./NoClass.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { AiOutlinePlusCircle } from "react-icons/ai";

export default function NoClass() {
  const { role } = useSelector((state: RootState) => state.user);
  const makeClass = () => {
    //클래스 만들기
  };
  return (
    <NoClassWrapper>
      <Lottie loop path="/lottieJson/tree.json" play style={{ width: 200, height: 200 }} />
      <NoClassText status={"ONGOING"}>존재하는 클래스가 없습니다</NoClassText>
      {role === "TEACHER" && (
        <MakeClassBtn>
          <AiOutlinePlusCircle /> 클래스 만들기
        </MakeClassBtn>
      )}
    </NoClassWrapper>
  );
}
