import { StyledTestHeaderContentBox, StyledTestHeaderTitle } from "./TextIndex.style";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

interface Iprops {
  page: string;
  isEnded: boolean;
  setToggleModal?: (toggleModal: boolean) => void;
}

export default function TestHeaderLeftContentBox({ page, isEnded, setToggleModal }: Iprops) {
  const { studyName } = useSelector((state: RootState) => state.exam);
  const router = useRouter();
  const { role } = useSelector((state: RootState) => state.user);

  const clickHandler = () => {
    setToggleModal && setToggleModal(true);
    // router.push(`/test/${router.query.studyId}/info`);
  };

  const goToDashBoard = () => {
    router.push(`/${role.toLowerCase()}/dashboard`);
  };

  return (
    <StyledTestHeaderContentBox>
      {/* 시험일 경우 경고 모달, 자습일 경우 저장 모달? */}
      {page !== "result" && !isEnded ? (
        <AiOutlineArrowLeft className="icon" onClick={clickHandler} />
      ) : (
        <img src={"/images/Forest_Logo.png"} className="logo-img" onClick={goToDashBoard} />
      )}
      <StyledTestHeaderTitle>{studyName}</StyledTestHeaderTitle>
    </StyledTestHeaderContentBox>
  );
}
