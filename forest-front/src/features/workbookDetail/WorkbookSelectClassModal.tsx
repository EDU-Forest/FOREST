import SmallBtn from "@/components/Button/SmallBtn";
import { ModalBtnsBox } from "@/styles/modal";
import {
  NoClassBox,
  WorkbookClassBtn,
  WorkbookClassBtnsBox,
  WorkbookClassModalFooterBox,
  WorkbookSelectClassModalBox,
} from "./WorkbookModal.style";
import useClassListQuery from "@/apis/class/useClassListQuery";
import { IClassList } from "@/types/ClassList";
import { useEffect, useState } from "react";
import { FaRegSadTear } from "react-icons/fa";

interface ClassType {
  classId: number;
  name: String;
}
interface IProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSettingOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedClass: number[];
  setSelectedClass: React.Dispatch<React.SetStateAction<number[]>>;
}

function WorkbookSelectClassModal({
  setIsOpen,
  setIsSettingOpen,
  selectedClass,
  setSelectedClass,
}: IProps) {
  const classInit = {
    classId: 0,
    className: "",
  };

  const { data: classes = [classInit] } = useClassListQuery();
  const [isSelectValidConfirm, setIsSlecteValidConfirm] = useState(true);

  const handleClickCancel = () => {
    setIsOpen(false);
  };

  const handleClickClass = (id: number) => {
    const findIdx = selectedClass.findIndex((e) => e === id);

    // 이미 선택한 클래스라면 선택 해제, 아니라면 선택
    if (findIdx !== -1) {
      setSelectedClass(selectedClass.filter((item) => item !== id));
    } else {
      setSelectedClass([...selectedClass, id]);
    }
  };

  const handleClickRegister = () => {
    // 한 개 이상의 클래스가 선택됐을 때만 등록 처리
    if (isSelectValidConfirm) {
      setIsOpen(false);
      setIsSettingOpen(true);
    }
  };

  const isSelected = (id: number): boolean => {
    return selectedClass.find((e) => e === id) ? true : false;
  };

  useEffect(() => {
    setSelectedClass([]);
  }, []);

  useEffect(() => {
    setIsSlecteValidConfirm(selectedClass.length >= 1 ? true : false);
  }, [selectedClass]);

  return (
    <WorkbookSelectClassModalBox>
      <p>출제할 클래스를 선택해주세요.</p>
      {classes.length === 0 ? (
        <NoClassBox>
          <p>클래스가 없습니다.</p>
        </NoClassBox>
      ) : (
        <WorkbookClassBtnsBox>
          {classes.map((classItem: IClassList, i: number) => (
            <WorkbookClassBtn
              key={`class-${i}`}
              onClick={() => handleClickClass(classItem.classId)}
              isSelected={isSelected(classItem.classId)}
            >
              {classItem.className}
            </WorkbookClassBtn>
          ))}
        </WorkbookClassBtnsBox>
      )}
      <WorkbookClassModalFooterBox>
        <p>총 {selectedClass.length}개의 클래스가 선택되었습니다.</p>
        <ModalBtnsBox>
          <SmallBtn onClick={handleClickCancel}>취소</SmallBtn>
          <SmallBtn onClick={handleClickRegister} colored={true} disabled={!isSelectValidConfirm}>
            등록
          </SmallBtn>
        </ModalBtnsBox>
      </WorkbookClassModalFooterBox>
    </WorkbookSelectClassModalBox>
  );
}

export default WorkbookSelectClassModal;
