import SmallBtn from "@/components/Button/SmallBtn";
import { ModalBtnsBox } from "@/styles/modal";
import {
  WorkbookClassBtn,
  WorkbookClassBtnsBox,
  WorkbookClassModalFooterBox,
  WorkbookSelectClassModalBox,
} from "./WorkbookModal.style";
import useClassListQuery from "@/apis/class/useClassListQuery";

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
  // dummy
  // const classes = [
  //   {
  //     classId: 1,
  //     name: "A반",
  //   },
  //   {
  //     classId: 2,
  //     name: "B반",
  //   },
  //   {
  //     classId: 3,
  //     name: "C반",
  //   },
  //   {
  //     classId: 4,
  //     name: "A반",
  //   },
  //   {
  //     classId: 5,
  //     name: "B반",
  //   },
  //   {
  //     classId: 6,
  //     name: "C반",
  //   },
  //   {
  //     classId: 7,
  //     name: "A반",
  //   },
  //   {
  //     classId: 8,
  //     name: "B반",
  //   },
  //   {
  //     classId: 9,
  //     name: "C반",
  //   },
  // ];

  const classInit = {
    classId: 0,
    className: "",
  };

  const { data: classes = [classInit] } = useClassListQuery();

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
    if (selectedClass.length >= 1) {
      setIsOpen(false);
      setIsSettingOpen(true);
      // 선택 클래스 초기화
      setSelectedClass([]);
    }
  };

  const isSelected = (id: number): boolean => {
    return selectedClass.find((e) => e === id) ? true : false;
  };

  return (
    <WorkbookSelectClassModalBox>
      <p>출제할 클래스를 선택해주세요.</p>
      {classes.length === 0 ? (
        <p>클래스가 없습니다</p>
      ) : (
        <WorkbookClassBtnsBox>
          {classes.map((classItem: ClassList) => (
            <WorkbookClassBtn
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
          <SmallBtn onClick={handleClickRegister} colored={true}>
            등록
          </SmallBtn>
        </ModalBtnsBox>
      </WorkbookClassModalFooterBox>
    </WorkbookSelectClassModalBox>
  );
}

export default WorkbookSelectClassModal;
