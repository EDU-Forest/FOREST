// hook이 아닌 재사용 함수

// 이메일 중복체크
export function checkEmail(email: string) {
  let email_format = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  return email_format.test(email);
}

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
