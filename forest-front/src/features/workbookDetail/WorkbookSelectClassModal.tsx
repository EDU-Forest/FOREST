import SmallBtn from "@/components/Button/SmallBtn";
import { ModalBox, ModalBtnsBox } from "@/styles/modal";
import { useState } from "react";
import { WorkbookClassBtn } from "./WorkbookModal.style";

interface IProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface ClassType {
  classId: number;
  name: String;
}

function WorkbookSelectClassModal({ setIsOpen }: IProps) {
  // dummy
  const classes = [
    {
      classId: 1,
      name: "A반",
    },
    {
      classId: 2,
      name: "B반",
    },
    {
      classId: 3,
      name: "C반",
    },
  ];

  const [selectedClass, setSelectedClass] = useState<number[]>([]);

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

  const isSelected = (id: number): boolean => {
    return selectedClass.find((e) => e === id) ? true : false;
  };

  return (
    <ModalBox>
      <p>출제할 클래스를 선택해주세요.</p>
      {classes.map((classItem) => (
        <WorkbookClassBtn
          onClick={() => handleClickClass(classItem.classId)}
          isSelected={isSelected(classItem.classId)}
        >
          {classItem.name}
        </WorkbookClassBtn>
      ))}
      <p>총 {selectedClass.length}개의 클래스가 선택되었습니다.</p>
      <ModalBtnsBox>
        <SmallBtn onClick={handleClickCancel}>취소</SmallBtn>
        <SmallBtn onClick={() => console.log("등록")} colored={true}>
          등록
        </SmallBtn>
      </ModalBtnsBox>
    </ModalBox>
  );
}

export default WorkbookSelectClassModal;
