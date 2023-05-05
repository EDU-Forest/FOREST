import { ModalBtnsBox } from "@/styles/modal";
import { WorkbookSettingModalBox, WorkbookSettingTitleInput } from "./WorkbookModal.style";
import { useEffect, useState } from "react";
import WorkbookSettingModalInputs from "./WorkbookSettingModalInputs";
import WorkbookSettingModalTypeSelect from "./WorkbookSettingModalTypeSelect";
import SmallBtn from "@/components/Button/SmallBtn";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useWorkbookDetailSetPost from "@/apis/workbookDetail/useWorkbookDetailSetPost";

interface IProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedClass: number[];
  title: string;
}

function WorkbookSettingModal({ setIsOpen, selectedClass, title }: IProps) {
  const [settingTitle, setSettingTitle] = useState(title);
  const [type, setType] = useState<string>("self");
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();

  const { workbook } = useSelector((state: RootState) => state.workbookDetail);

  const { data, mutate: setWorkbookApi } = useWorkbookDetailSetPost();

  const types = [
    { value: "self", text: "자습" },
    { value: "homework", text: "과제" },
    { value: "exam", text: "시험" },
  ];

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSettingTitle(e.target.value);
  };

  const handleClickCancel = () => {
    setIsOpen(false);
  };

  const handleClickSet = () => {
    console.log(selectedClass, settingTitle);

    const data = {
      workbookId: workbook.workbookId,
      classId: [...selectedClass],
      type: type,
      name: settingTitle,
      startTime: startTime,
      endTime: endTime,
    };

    setWorkbookApi(data);
  };

  useEffect(() => {
    if (data?.code === 204) {
      setIsOpen(false);
    }
  }, [data]);

  return (
    <WorkbookSettingModalBox>
      <WorkbookSettingTitleInput
        value={settingTitle}
        placeholder="제목을 입력해주세요"
        onChange={handleChangeTitle}
      ></WorkbookSettingTitleInput>
      <WorkbookSettingModalTypeSelect types={types} setType={setType} />
      <hr />
      <WorkbookSettingModalInputs
        type={type}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />
      <ModalBtnsBox>
        <SmallBtn onClick={handleClickCancel}>취소</SmallBtn>
        <SmallBtn onClick={handleClickSet} colored={true}>
          출제
        </SmallBtn>
      </ModalBtnsBox>
    </WorkbookSettingModalBox>
  );
}

export default WorkbookSettingModal;
