import SmallBtn from "@/components/Button/SmallBtn";
import { ModalBtnsBox } from "@/styles/modal";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import WorkbookExportRadioGroup from "./WorkbookExportRadioGroup";
import { WorkbookExportModalBox } from "./WorkbookModal.style";

interface IProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface ExportType {
  value: string;
  text: string;
  img: React.ReactElement<SetConstructor>;
  action: () => void;
}

function WorkbookExportModal({ setIsOpen }: IProps) {
  const chosenSet = () => {
    console.log("출제한다");
  };

  const chosenRelease = () => {
    console.log("배포한다");
  };

  const chosenPdf = () => {
    console.log("피디엪이다");
  };

  const exports: ExportType[] = [
    { value: "set", text: "출제", img: <AiOutlineEdit />, action: chosenSet },
    { value: "release", text: "배포", img: <AiOutlineEdit />, action: chosenRelease },
    { value: "pdf", text: "PDF", img: <AiOutlineEdit />, action: chosenPdf },
  ];

  const [value, setValue] = useState(exports[0].value);

  const handleClickCancel = () => {
    setIsOpen(false);
  };

  const handleClickChoose = () => {
    const chosenAction = exports.find((e) => e.value === value)?.action;
    // find는 찾은 요소가 없는 경우에는 undefined를 반환한다
    // 따라서 chosenAction의 타입은 undefined 일 수 있기 때문에, undefined가 아닌 경우에만 함수 실행
    chosenAction && chosenAction();
  };

  return (
    <WorkbookExportModalBox>
      <p>내보내기 방식을 선택해주세요.</p>
      <WorkbookExportRadioGroup exports={exports} setValue={setValue} />
      <ModalBtnsBox>
        <SmallBtn onClick={handleClickCancel}>취소</SmallBtn>
        <SmallBtn onClick={handleClickChoose} colored={true}>
          선택
        </SmallBtn>
      </ModalBtnsBox>
    </WorkbookExportModalBox>
  );
}

export default WorkbookExportModal;
