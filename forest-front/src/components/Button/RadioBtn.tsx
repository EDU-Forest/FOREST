import { positionCenter } from "@/styles/theme";
import styled from "styled-components";

interface Iprops {
  value: string;
  selected: boolean;
  color: string;
}

const StyledRadioBtn = styled.button<{ color: string }>`
  position: relative;
  width: 1rem;
  height: 1rem;
  padding: 0;
  background-color: white;
  border-radius: 100%;
  border: 1px solid
    ${({ color, theme }) =>
      color === "green"
        ? theme.colors.Lime[700]
        : color === "orange"
        ? theme.colors.Orange[500]
        : theme.colors.Gray[500]};
`;

const RadioInner = styled.div<{ color: string }>`
  ${positionCenter("absolute")}
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  background-color: ${({ color, theme }) =>
    color === "green"
      ? theme.colors.Lime[700]
      : color === "orange"
      ? theme.colors.Orange[500]
      : theme.colors.Gray[500]};
`;

export default function RadioBtn({ value, selected, color }: Iprops) {
  return (
    <StyledRadioBtn value={value} color={color}>
      {selected && <RadioInner color={color} />}
    </StyledRadioBtn>
  );
}
