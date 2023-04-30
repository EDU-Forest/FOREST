import { positionCenter } from "@/styles/theme";
import styled from "styled-components";

interface Iprops {
  selected: boolean;
}

const StyledRadioBtn = styled.button`
  position: relative;
  width: 1rem;
  height: 1rem;
  padding: 0;
  background-color: white;
  border-radius: 100%;
  border: 1px solid ${({ theme }) => theme.colors.Lime[700]};
`;

const RadioInner = styled.div`
  ${positionCenter("absolute")}
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.Lime[700]};
`;

export default function RadioBtn({ selected }: Iprops) {
  return <StyledRadioBtn>{selected && <RadioInner />}</StyledRadioBtn>;
}
