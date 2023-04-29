// import { MdAccessTimeFilled } from "react-icons/md";
import { useState } from "react";
import {
  WorkbookSettingModalInputsBox,
  WorkbookSettingModalTimeBox,
  WorkbookSettingTimeInputBox,
} from "./WorkbookModal.style";

interface IProps {
  type: string;
}

function WorkbookSettingModalInputs({ type }: IProps) {
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();

  const handleChangeStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };
  const handleChangeEndTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  return (
    <WorkbookSettingModalInputsBox>
      <WorkbookSettingModalTimeBox disabled={type !== "exam"}>
        <p>시작 시간</p>
        <WorkbookSettingTimeInputBox as="div">
          <input
            type="time"
            placeholder="시작 시간을 선택하세요"
            value={startTime}
            onChange={handleChangeStartTime}
            disabled={type !== "exam"}
          />
          {/* <MdAccessTimeFilled /> */}
        </WorkbookSettingTimeInputBox>
      </WorkbookSettingModalTimeBox>
      <WorkbookSettingModalTimeBox disabled={type === "self"}>
        <p>종료 시간</p>
        <WorkbookSettingTimeInputBox as="div">
          <input
            type="time"
            placeholder="종료 시간을 선택하세요"
            value={endTime}
            onChange={handleChangeEndTime}
            disabled={type === "self"}
          />
          {/* <MdAccessTimeFilled /> */}
        </WorkbookSettingTimeInputBox>
      </WorkbookSettingModalTimeBox>
    </WorkbookSettingModalInputsBox>
  );
}

export default WorkbookSettingModalInputs;
