import { useState } from "react";
import styled from "styled-components";

interface Iprops {
  value: string;
}

const StyledClassBtn = styled.button<{ selected: boolean }>`
  display: inline-block;
  font-size: 1rem;
  font-weight: 700;
  width: 30rem;
  height: 3rem;
  line-height: 2.5rem;
  border: 2px solid #74b816;
  border-radius: 1.5rem;
  background-color: ${({ selected, theme }) => (selected ? theme.colors.Lime[700] : "white")};
  color: ${({ selected }) => (selected ? "white" : "black")};
`;

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
