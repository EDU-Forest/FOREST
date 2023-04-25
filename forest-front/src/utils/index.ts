// hook이 아닌 재사용 함수

export function checkEmail(email: string) {
  let email_format = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  return email_format.test(email);
}
