export function date(date: string) {
  return date?.replaceAll("T", " ").slice(0, 10);
}

export function isStarted(startTime: Date) {
  return new Date(startTime).getTime() <= new Date().getTime();
}

export function isEnded(endTime: Date) {
  return new Date(endTime).getTime() <= new Date().getTime();
}
