export const checkBirthRange = (date: string) => {
  const [year, month, day] = date.split("-").map((data) => parseInt(data));
  const [today_year, today_month, today_day] = new Date()
    .toISOString()
    .substring(0, 10)
    .split("-")
    .map((data) => parseInt(data));
  if (
    (year >= 1900 && year < today_year) ||
    (year === today_year && month > 0 && month < today_month) ||
    (year === today_year && month === today_month && day > 0 && day <= today_day)
  ) {
    return "pass";
  }

  return "fail";
};
