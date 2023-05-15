import { useSelector } from "react-redux";
import { StyledTestHeaderContentBox, StyledTestHeaderText } from "./TextIndex.style";
import { RootState } from "@/stores/store";
import { clearInterval, setInterval } from "timers";
import { useEffect, useRef, useState } from "react";
import { dateToMinute, dateToSecond } from "@/utils";
import { useDispatch } from "react-redux";
import { setEndStudy } from "@/stores/exam/exam";

export default function TestHeaderRightContentBox() {
  const { volume, startTime, endTime, isSubmitted, page } = useSelector(
    (state: RootState) => state.exam,
  );
  const dispatch = useDispatch();
  const [minutes, setMinutes] = useState(endTime ? dateToMinute(new Date(), endTime) : 0);
  const [seconds, setSeconds] = useState(endTime ? dateToSecond(new Date(), endTime) % 60 : 0);

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
      if (seconds === 0 && minutes === 0) {
        dispatch(setEndStudy());
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

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
            : `남은 시간 : ${
                minutes < 0
                  ? 0
                  : minutes >= 60
                  ? `${Math.floor(minutes / 60)} 시간 ${minutes % 60} 분`
                  : `${minutes} 분`
              } ${seconds < 0 ? 0 : seconds} 초`
          : "시험 종료"}
      </StyledTestHeaderText>
    </StyledTestHeaderContentBox>
  );
}
