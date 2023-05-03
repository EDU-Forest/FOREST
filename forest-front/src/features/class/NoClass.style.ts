import { StyledWorkbookStatus } from "@/components/Status/Status.style";
import { flexBox } from "@/styles/theme";
import styled from "styled-components";

const NoClassWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: 0rem 0rem 1.25rem 0.125rem rgba(0, 0, 0, 0.1);
  border-radius: 1.5rem;
  padding: 2rem;
  ${flexBox("column", "center", "center")}
`;

const NoClassText = styled(StyledWorkbookStatus)`
  font-size: 1rem;
  padding: 0.5rem 2rem;
  margin: 1rem;
`;

const MakeClassBtn = styled.p`
  color: ${({ theme }) => theme.colors.Gray[600]};
  font-size: 0.875rem;

  svg {
    vertical-align: text-bottom;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
`;

export { NoClassWrapper, NoClassText, MakeClassBtn };
