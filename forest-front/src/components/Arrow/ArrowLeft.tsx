import { AiOutlineArrowLeft } from "react-icons/ai";
import styled from "styled-components";

interface Iprops {
  onClick: () => void;
}

const ArrowIcon = styled.span`
  cursor: pointer;
  font-size: 2rem;
  color:  ${({ theme }) => theme.colors.Lime[900]}};
`;

export default function ArrowLeft({ onClick }: Iprops) {
  return (
    <ArrowIcon onClick={onClick}>
      <AiOutlineArrowLeft />
    </ArrowIcon>
  );
}
