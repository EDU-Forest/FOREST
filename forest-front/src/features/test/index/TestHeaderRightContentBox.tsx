import { useSelector } from "react-redux";
import { StyledTestHeaderContentBox, StyledTestHeaderText } from "./TextIndex.style";
import { RootState } from "@/stores/store";
import { clearInterval, setInterval } from "timers";
import { useEffect, useRef, useState } from "react";
import { dateToMinute, dateToSecond } from "@/utils";

interface Iprops {
  page: string;
  minutes: number;
  seconds: number;
}

export default function TestHeaderRightContentBox({ page, minutes, seconds }: Iprops) {
  const { volume, startTime, endTime } = useSelector((state: RootState) => state.exam);

  return (
    <StyledTestHeaderContentBox>
      <StyledTestHeaderText>총 {volume}문항</StyledTestHeaderText>
      <StyledTestHeaderText>|</StyledTestHeaderText>
      <StyledTestHeaderText>
        {page === "study"
          ? minutes <= 0 && seconds <= 0
            ? "시험 종료"
            : startTime && endTime
            ? `남은 시간 : ${minutes < 0 ? 0 : minutes} 분 ${seconds < 0 ? 0 : seconds} 초`
            : "제한 시간 없음"
          : page === "result"
          ? "시험 종료"
          : `제한 시간 : ${dateToMinute(startTime, endTime)} 분`}
      </StyledTestHeaderText>
    </StyledTestHeaderContentBox>
  );
}
