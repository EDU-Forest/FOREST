import { StyledTestHeaderContentBox, StyledTestHeaderTitle } from "./TextIndex.style";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import { setToggleModal } from "@/stores/exam/exam";

export default function TestHeaderLeftContentBox() {
  const dispatch = useDispatch();
  const { studyName, isSubmitted, page } = useSelector((state: RootState) => state.exam);
  const router = useRouter();
  const { role } = useSelector((state: RootState) => state.user);

  const clickHandler = () => {
    dispatch(setToggleModal(true));
    // router.push(`/test/${router.query.studyId}/info`);
  };

  const goToDashBoard = () => {
    router.push(`/${role.toLowerCase()}/dashboard`);
  };

  return (
    <StyledTestHeaderContentBox>
      {/* 시험일 경우 경고 모달, 자습일 경우 저장 모달? */}
      {page !== "result" && !isSubmitted ? (
        <AiOutlineArrowLeft className="icon" onClick={clickHandler} />
      ) : (
        <img src={"/images/Forest_Logo.png"} className="logo-img" onClick={goToDashBoard} />
      )}
      <StyledTestHeaderTitle>{studyName}</StyledTestHeaderTitle>
    </StyledTestHeaderContentBox>
  );
}
