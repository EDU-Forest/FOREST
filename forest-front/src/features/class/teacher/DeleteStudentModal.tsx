import { ModalBtnsBox } from "@/styles/modal";
import { DeleteModalBox } from "./DeleteStudentModal.style";
import SmallBtn from "@/components/Button/SmallBtn";
import { useDispatch } from "react-redux";
import { closeDeleteStudentModal } from "@/stores/class/classModal";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useClassStudentDelete from "@/apis/class/teacher/useClassStudentDelete";

export default function DeleteStudentModal() {
  const dispatch = useDispatch();
  const { mutate } = useClassStudentDelete();
  const classId = useSelector((state: RootState) => state.class.nowClassId);
  const userId = useSelector((state: RootState) => state.class.deleteStudentNum);
  const confirm = () => {
    mutate({ classId, userId });
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
