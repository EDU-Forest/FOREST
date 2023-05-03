// hook이 아닌 재사용 함수

// 이메일 중복체크
export function checkEmail(email: string) {
  let email_format = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  return email_format.test(email);
}

// 시간제한 구하기
export const getTimeLimit = (start: Date, end: Date) => {
  if (!start || !end) return 0;
  return Math.floor(Math.abs((end.getTime() - start.getTime()) / (1000 * 60)));
};
