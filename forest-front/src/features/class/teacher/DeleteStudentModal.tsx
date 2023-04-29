import { ModalBtnsBox } from "@/styles/modal";
import { DeleteModalBox } from "./DeleteStudentModal.style";
import SmallBtn from "@/components/Button/SmallBtn";
import { useDispatch } from "react-redux";
import { closeDeleteStudentModal } from "@/stores/class/classModal";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

interface Iprops {
  userId: number;
}

export default function DeleteStudentModal({ userId }: Iprops) {
  const dispatch = useDispatch();
  const classId = useSelector((state: RootState) => state.class.nowClassId);
  const confirm = () => {
    // 확인 ->classId, userId 필요
  };

  return (
    <DeleteModalBox>
      <p>정말 삭제하시겠습니까?</p>
      <ModalBtnsBox>
        <SmallBtn children="취소" onClick={() => dispatch(closeDeleteStudentModal())} />
        <SmallBtn children="확인" colored onClick={confirm} />
      </ModalBtnsBox>
    </DeleteModalBox>
  );
}
