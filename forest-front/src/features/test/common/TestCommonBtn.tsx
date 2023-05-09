import { useRouter } from "next/router";
import { StyledTestCommonBtn } from "./TextCommon.style";
import useStartStudy from "@/apis/study/useStartStudyQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useEffect, useState } from "react";
import { isEnded, isStarted } from "@/utils/date";
import { dateToMinute, dateToSecond } from "@/utils";

export default function TestCommonBtn() {
  const router = useRouter();
  const studyId = router.query?.studyId;
  const { mutate } = useStartStudy();
  const { startTime, endTime, isSubmitted } = useSelector((state: RootState) => state.exam);
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
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  const startTestHandler = () => {
    if (!endTime || new Date(endTime).getTime() >= new Date().getTime()) {
      mutate(typeof studyId === "string" ? parseInt(studyId) : -1);
      router.push(`/test/${studyId}`);
    } else {
      alert("종료된 시험입니다.");
      goToResultHandler();
    }
  };

  const goToResultHandler = () => {
    router.push(`/student/class`);
  };

  return (
    <>
      {startTime && endTime && !isSubmitted && !isStarted(startTime) ? (
        <StyledTestCommonBtn disabled>
          {minutes >= 60
            ? `${Math.floor(minutes / 60)} : ${minutes % 60} : ${seconds} 이후 시작됩니다.`
            : `${minutes} : ${seconds} 이후 시작됩니다.`}
        </StyledTestCommonBtn>
      ) : isSubmitted || (endTime && isEnded(endTime)) ? (
        <StyledTestCommonBtn onClick={goToResultHandler}>결과 보기</StyledTestCommonBtn>
      ) : !isSubmitted && endTime && isEnded(endTime) ? (
        <StyledTestCommonBtn disabled>종료된 시험입니다.</StyledTestCommonBtn>
      ) : (
        <StyledTestCommonBtn onClick={startTestHandler}>시작하기</StyledTestCommonBtn>
      )}
    </>
  );
}
