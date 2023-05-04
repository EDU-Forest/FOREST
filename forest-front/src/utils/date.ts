export default function date(date: string) {
  return date.replaceAll("T", " ").slice(0, 10);
}
