export default function arrangeDate(date: string) {
  return date?.replaceAll("T", " ").slice(0, 16);
}
