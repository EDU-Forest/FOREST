import { ModalBtnsBox } from "@/styles/modal";
import { DeleteModalBox } from "./DeleteStudentModal.style";
import SmallBtn from "@/components/Button/SmallBtn";

interface Iprops {
  handleModal: () => void;
}

export default function DeleteStudentModal({ handleModal }: Iprops) {
  const confirm = () => {
    // 확인
  };
  return (
    <DeleteModalBox>
      <p>정말 삭제하시겠습니까?</p>
      <ModalBtnsBox>
        <SmallBtn children="취소" onClick={handleModal} />
        <SmallBtn children="확인" colored onClick={confirm} />
      </ModalBtnsBox>
    </DeleteModalBox>
  );
}
