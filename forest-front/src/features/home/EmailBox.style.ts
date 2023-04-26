import styled from "styled-components";
import { flexBox } from "@/styles/theme";

const EmailBoxWrapper = styled.div`
  ${flexBox("row", "center", "space-between")}
  width: 12.75rem;

  .link {
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.Gray[900]};
    }
  }
`;

const GrayText = styled.div`
  font-weight: bold;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.Gray[600]};
`;

export { EmailBoxWrapper, GrayText };
