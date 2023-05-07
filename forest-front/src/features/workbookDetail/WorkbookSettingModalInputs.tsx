// import { MdAccessTimeFilled } from "react-icons/md";
import { useEffect, useState } from "react";
import {
  WorkbookSettingModalInputsBox,
  WorkbookSettingModalTimeBox,
  WorkbookSettingTimeInputBox,
} from "./WorkbookModal.style";
import { start } from "repl";

interface IProps {
  type: string;
  startTime: any;
  setStartTime: any;
  startDay: any;
  setStartDay: any;
  endTime: any;
  setEndTime: any;
  endDay: any;
  setEndDay: any;
}

function WorkbookSettingModalInputs({
  type,
  startTime,
  setStartTime,
  startDay,
  setStartDay,
  endTime,
  setEndTime,
  endDay,
  setEndDay,
}: IProps) {
  const handleChangeStart = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (type === "date") {
      setStartDay(e.target.value);
    } else if (type === "time") {
      setStartTime(e.target.value);
    }
  };
  const handleChangeEnd = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (type === "date") {
      setEndDay(e.target.value);
    } else if (type === "time") {
      setEndTime(e.target.value);
    }
  };

  return (
    <WorkbookSettingModalInputsBox>
      <WorkbookSettingModalTimeBox disabled={type !== "exam"}>
        <p>시작 일시</p>
        <WorkbookSettingTimeInputBox as="div">
          <input
            type="date"
            placeholder="시작 날짜를 선택하세요"
            value={startDay}
            onChange={(e) => handleChangeStart(e, "date")}
            disabled={type !== "exam"}
          />
          <span>|</span>
          <input
            type="time"
            placeholder="시작 시간을 선택하세요"
            value={startTime}
            onChange={(e) => handleChangeStart(e, "time")}
            disabled={type !== "exam"}
          />
          {/* <MdAccessTimeFilled /> */}
        </WorkbookSettingTimeInputBox>
      </WorkbookSettingModalTimeBox>
      <WorkbookSettingModalTimeBox disabled={type === "self"}>
        <p>종료 일시</p>
        <WorkbookSettingTimeInputBox as="div">
          <input
            type="date"
            placeholder="종료 날짜를 선택하세요"
            value={endDay}
            onChange={(e) => handleChangeEnd(e, "date")}
            disabled={type === "self"}
          />
          <span>|</span>
          <input
            type="time"
            placeholder="종료 시간을 선택하세요"
            value={endTime}
            onChange={(e) => handleChangeEnd(e, "time")}
            disabled={type === "self"}
          />
          {/* <MdAccessTimeFilled /> */}
        </WorkbookSettingTimeInputBox>
      </WorkbookSettingModalTimeBox>
    </WorkbookSettingModalInputsBox>
  );
}

export default WorkbookSettingModalInputs;
