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
  const { volume, startTime, endTime, isSubmitted } = useSelector((state: RootState) => state.exam);

  return (
    <StyledTestHeaderContentBox>
      <StyledTestHeaderText>총 {volume}문항</StyledTestHeaderText>
      <StyledTestHeaderText>|</StyledTestHeaderText>
      <StyledTestHeaderText>
        {isSubmitted
          ? "시험 종료"
          : !startTime || !endTime
          ? "제한 시간 없음"
          : page === "study"
          ? minutes <= 0 && seconds <= 0
            ? "시험 종료"
            : `남은 시간 : ${minutes < 0 ? 0 : minutes} 분 ${seconds < 0 ? 0 : seconds} 초`
          : "시험 종료"}
      </StyledTestHeaderText>
    </StyledTestHeaderContentBox>
  );
}
