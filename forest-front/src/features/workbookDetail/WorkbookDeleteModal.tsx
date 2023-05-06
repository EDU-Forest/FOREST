import useWorkbookDetailDelete from "@/apis/workbookDetail/useWorkbookDetailDelete";
import SmallBtn from "@/components/Button/SmallBtn";
import { ModalBox, ModalBtnsBox } from "@/styles/modal";
import { RootState } from "@/stores/store";
import { useSelector } from "react-redux";

interface IProps {
  setIsOpenDelete: any;
}

function WorkbookDeleteModal({ setIsOpenDelete }: IProps) {
  const { workbook } = useSelector((state: RootState) => state.workbookDetail);

  const { data: res, mutate: workbookDeleteApi } = useWorkbookDetailDelete();

  const handleClickCancel = () => {
    setIsOpenDelete(false);
  };

  const handleClickDeleteConfirm = () => {
    // api call,성공 후 모달 close
    workbookDeleteApi(workbook.workbookId);
    console.log(res)
    setIsOpenDelete(false);
  };

  return (
    <ModalBox>
      <p>문제집을 삭제하시겠습니까?</p>
      <ModalBtnsBox>
        <SmallBtn onClick={handleClickCancel}>취소</SmallBtn>
        <SmallBtn onClick={handleClickDeleteConfirm} colored>
          확인
        </SmallBtn>
      </ModalBtnsBox>
    </ModalBox>
  );
}

export default WorkbookDeleteModal;
