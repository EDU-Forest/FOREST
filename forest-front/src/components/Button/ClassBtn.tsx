import { useState } from "react";
import { StyledClassBtn } from "./Btn.style";

interface Iprops {
  value: string;
}

export default function ClassBtn({ value }: Iprops) {
  const [selected, setSelected] = useState<boolean>(false);
  const selectClass = () => {
    setSelected(!selected);
  };
  return (
    <StyledClassBtn selected={selected} onClick={selectClass}>
      {value}
    </StyledClassBtn>
  );
}
