export function date(date: string) {
  return date?.replaceAll("T", " ").slice(0, 10);
}

export function isStarted(startTime: Date) {
  return new Date(startTime).getTime() <= new Date().getTime();
}

export function isEnded(endTime: Date) {
  return new Date(endTime).getTime() <= new Date().getTime();
}

export function getCurTimeToString(afterXHour = 0) {
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const HOUR = 60 * 60 * 1000;
  const KR_TIME = new Date().getTime() + KR_TIME_DIFF + afterXHour * HOUR;

  return new Date(KR_TIME).toJSON().slice(11, 16);
}

export function getCurDayToString() {
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

  return new Date(new Date().getTime() + KR_TIME_DIFF).toJSON().slice(0, 10);
}
