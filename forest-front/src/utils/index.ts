// hook이 아닌 재사용 함수

// 이메일 중복체크
export function checkEmail(email: string) {
  let email_format = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  return email_format.test(email);
}

// 제한시간 계산
export const dateToTime = (start: Date, end: Date) => {
  const minutes = dateToMinute(start, end);

  if (minutes < 60) {
    return minutes;
  } else {
    return `${Math.floor(minutes / 60)} 시간 ${minutes % 60 ? `${minutes % 60} 분` : ""}`;
  }
};

// 날짜 분으로 환산
export const dateToMinute = (start: Date, end: Date) => {
  return Math.floor((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60));
};

// 날짜 초로 환산
export const dateToSecond = (start: Date, end: Date) => {
  return Math.floor((new Date(end).getTime() - new Date(start).getTime()) / 1000);
};

// 분 초로 환산
export const secondToMinute = (time: number) => {
  const minute = String(Math.floor(time / 60));
  const second = String(Math.floor(time % 60));
  return `${minute.padStart(2, "0")} 분 ${second.padStart(2, "0")} 초`;
};

// 8자 이후로 줄임말(...) 처리
export const textFormatter = (text: string) => {
  if (text.length <= 8) {
    return text;
  } else {
    return text.slice(0, 8) + "...";
  }
};

export const titleFormatter = (title: string) => {
  if (title.length <= 6) {
    return title;
  } else {
    return title.slice(0, 6) + "...";
  }
};

export const phoneFormatter = (phone: string) => {
  if (phone.length === 10) {
    return `${phone.slice(0, 3)}-***-${phone.slice(6)}`;
  } else {
    return `${phone.slice(0, 3)}-****-${phone.slice(7)}`;
  }
};
