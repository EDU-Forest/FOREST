import { StyledHashTag } from "./HashTag.style";

interface Iprops {
  value: string;
  onClick: (value: string) => void;
}

export default function HashTag({ value, onClick }: Iprops) {
  return <StyledHashTag onClick={() => onClick(value)}># {value}</StyledHashTag>;
}
