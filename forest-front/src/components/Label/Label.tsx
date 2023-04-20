import styled from "styled-components";
import { BsCheckCircleFill } from "react-icons/bs";

interface Iprops {
  children: string;
  status: string;
}

const StyledLabel = styled.p<{ status: string }>`
  color: ${({ status, theme }) =>
    status === "pass"
      ? theme.colors.Lime[600]
      : status === "fail"
      ? theme.colors.Orange[500]
      : theme.colors.Gray[500]};
  .icon {
    font-size: 0.75rem;
    margin-right: 0.25rem;
  }
`;

export default function Label({ children, status }: Iprops) {
  return (
    <StyledLabel status={status}>
      <BsCheckCircleFill className="icon" />
      {children}
    </StyledLabel>
  );
}
