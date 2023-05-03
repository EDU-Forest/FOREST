import Lottie from "react-lottie-player";
import { NoClassText, NoClassWrapper, MakeClassBtn } from "./NoClass.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { openAddClassModal } from "@/stores/class/classModal";
import AddClassModal from "./teacher/AddClassModal";

export default function NoClass() {
  const dispatch = useDispatch();
  const { isOpenAddClassModal } = useSelector((state: RootState) => state.classModal);
  const { role } = useSelector((state: RootState) => state.user);

  const makeClass = () => {
    dispatch(openAddClassModal());
  };

  return (
    <NoClassWrapper>
      <Lottie loop path="/lottieJson/tree.json" play style={{ width: 200, height: 200 }} />
      <NoClassText status={"ONGOING"}>존재하는 클래스가 없습니다</NoClassText>
      {role === "TEACHER" && (
        <>
          <MakeClassBtn onClick={makeClass}>
            <AiOutlinePlusCircle /> 클래스 만들기
          </MakeClassBtn>
          {isOpenAddClassModal && <AddClassModal />}
        </>
      )}
    </NoClassWrapper>
  );
}
