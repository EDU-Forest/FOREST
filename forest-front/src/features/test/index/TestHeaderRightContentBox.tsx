import { useSelector } from "react-redux";
import { StyledTestHeaderContentBox, StyledTestHeaderText } from "./TextIndex.style";
import { RootState } from "@/stores/store";
import { clearInterval, setInterval } from "timers";
import { useEffect, useRef, useState } from "react";
import { dateToMinute, dateToSecond } from "@/utils";

interface Iprops {
  page: string;
}

export default function TestHeaderRightContentBox({ page }: Iprops) {
  const { volume, startTime, endTime } = useSelector((state: RootState) => state.exam);
  const [minutes, setMinutes] = useState(dateToMinute(new Date(), endTime));
  const [seconds, setSeconds] = useState(dateToSecond(new Date(), endTime) % 60);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds <= 0) {
        if (minutes <= 0) {
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <StyledTestHeaderContentBox>
      <StyledTestHeaderText>총 {volume}문항</StyledTestHeaderText>
      <StyledTestHeaderText>|</StyledTestHeaderText>
      <StyledTestHeaderText>
        {page === "study"
          ? startTime && endTime
            ? `남은 시간 : ${minutes < 0 ? 0 : minutes} 분 ${seconds < 0 ? 0 : seconds} 초`
            : "제한 시간 없음"
          : `제한 시간 : ${dateToMinute(startTime, endTime)} 분`}
      </StyledTestHeaderText>
    </StyledTestHeaderContentBox>
  );
}
