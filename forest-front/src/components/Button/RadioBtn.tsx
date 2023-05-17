import { RadioInner, StyledRadioBtn } from "./Btn.style";

interface Iprops {
  value: string;
  selected: boolean;
  color: string;
}

export default function RadioBtn({ value, selected, color }: Iprops) {
  return (
    <StyledRadioBtn value={value} color={color}>
      {selected && <RadioInner color={color} />}
    </StyledRadioBtn>
  );
}
