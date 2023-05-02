import { Title } from "@/styles/text";
import { flexBox } from "@/styles/theme";
import styled from "styled-components";

const StudentListTextWrapper = styled.div`
  ${flexBox("row", "start", "space-between")};
`;

const StudentListTitle = styled(Title)`
  display: inline-block;
`;
const StudentListText = styled.span`
  color: ${({ theme }) => theme.colors.Gray[500]};
  font-size: 1.375rem;
  margin: 0 0.5rem;
`;

const StudentAddText = styled(StudentListText)`
  font-size: 1rem;
  cursor: pointer;

  .icon {
    font-size: 1.5rem;
    margin-right: 0.5rem;
    vertical-align: text-bottom;
  }
`;

const StudentListWrapper = styled.div`
  ${flexBox("row", "center", "space-between")}
  flex-wrap: wrap;
`;

export {
  StudentListTextWrapper,
  StudentListTitle,
  StudentAddText,
  StudentListText,
  StudentListWrapper,
};
