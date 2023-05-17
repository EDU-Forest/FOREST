import useWorkbookDetailSetPost from "@/apis/workbookDetail/useWorkbookDetailSetPost";
import SmallBtn from "@/components/Button/SmallBtn";
import { RootState } from "@/stores/store";
import { ModalBtnsBox } from "@/styles/modal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { WorkbookSettingModalBox, WorkbookSettingTitleInput } from "./WorkbookModal.style";
import WorkbookSettingModalInputs from "./WorkbookSettingModalInputs";
import WorkbookSettingModalTypeSelect from "./WorkbookSettingModalTypeSelect";
import { getCurDayToString, getCurTimeToString } from "@/utils/date";

interface IProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedClass: number[];
  title: string;
  setIsSetSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

function WorkbookSettingModal({ setIsOpen, selectedClass, title, setIsSetSuccess }: IProps) {
  const [settingTitle, setSettingTitle] = useState(title);
  const [type, setType] = useState<string>("exam");
  const [startTime, setStartTime] = useState<string>(getCurTimeToString());
  const [startDay, setStartDay] = useState<string>(getCurDayToString());
  const [endTime, setEndTime] = useState<string>(getCurTimeToString(1));
  const [endDay, setEndDay] = useState<string>(getCurDayToString());
  const [isDateValidConfirm, setIsDateValidConfirm] = useState(true);
  const [isTitleValidConfirm, setIsTitleValidConfirm] = useState(true);
  const titleMaxCnt = 30;

  const { workbook } = useSelector((state: RootState) => state.workbookDetail);

  const { mutate: setWorkbookApi, isSuccess } = useWorkbookDetailSetPost();

  const types = [
    { value: "exam", text: "시험" },
    { value: "homework", text: "과제" },
    { value: "self", text: "자습" },
  ];

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSettingTitle(e.target.value);
    setIsTitleValidConfirm(e.target.value ? true : false);
  };

  const handleClickCancel = () => {
    setIsOpen(false);
  };

  const handleClickSet = () => {
    const classIdList = selectedClass.map((classId: number) => {
      return {
        classId: classId,
      };
    });

    const data = {
      workbookId: workbook.workbookId,
      classIdList,
      type: type,
      name: settingTitle,
      startTime: type === "exam" ? startDay && startTime && `${startDay}T${startTime}` : null,
      endTime: type !== "self" ? endDay && endTime && `${endDay}T${endTime}` : null,
    };

    setWorkbookApi(data);
  };

  const dateValidTest = () => {
    const today = new Date();
    const start = new Date(`${startDay}T${startTime}`);
    const end = new Date(`${endDay}T${endTime}`);

    const isAfterToday = (day: Date) => {
      return new Date(today).getTime() <= new Date(day).getTime() + 1000 * 60;
    };

    switch (type) {
      case "self":
        setIsDateValidConfirm(true);
        break;
      case "homework":
        setIsDateValidConfirm(endDay && endTime && isAfterToday(end) ? true : false);
        break;
      case "exam":
        setIsDateValidConfirm(isAfterToday(start) && isAfterToday(end) && start < end);
        break;
    }
  };

  useEffect(() => {
    dateValidTest();
  }, [startDay, startTime, endDay, endTime, type]);

  useEffect(() => {
    setIsSetSuccess(isSuccess);
    isSuccess && setIsOpen(false);
  }, [isSuccess]);

  return (
    <WorkbookSettingModalBox>
      <WorkbookSettingTitleInput
        value={settingTitle}
        maxLength={titleMaxCnt}
        placeholder="제목을 입력해주세요"
        onChange={handleChangeTitle}
      ></WorkbookSettingTitleInput>
      <WorkbookSettingModalTypeSelect types={types} setType={setType} />
      <hr />
      <WorkbookSettingModalInputs
        type={type}
        startTime={startTime}
        setStartTime={setStartTime}
        startDay={startDay}
        setStartDay={setStartDay}
        endTime={endTime}
        setEndTime={setEndTime}
        endDay={endDay}
        setEndDay={setEndDay}
      />
      <ModalBtnsBox>
        <SmallBtn onClick={handleClickCancel}>취소</SmallBtn>
        <SmallBtn
          onClick={() => isDateValidConfirm && isTitleValidConfirm && handleClickSet()}
          colored={true}
          disabled={!isDateValidConfirm || !isTitleValidConfirm}
        >
          출제
        </SmallBtn>
      </ModalBtnsBox>
    </WorkbookSettingModalBox>
  );
}

export default WorkbookSettingModal;
