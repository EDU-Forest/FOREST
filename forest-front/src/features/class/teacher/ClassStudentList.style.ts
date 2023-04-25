import { Title } from "@/styles/text";
import { flexBox } from "@/styles/theme";
import styled from "styled-components";

const StudentListTextWrapper = styled.div`
  ${flexBox("row", "center", "space-between")}
`;

const StudentListTitle = styled(Title)`
  display: inline-block;
`;
const StudentListText = styled.span`
  color: ${({ theme }) => theme.colors.Gray[500]};
  font-size: 22px;
  margin-left: 4px;
`;

const StudentListWrapper = styled.div`
  ${flexBox("row", "center", "space-between")}
  flex-wrap: wrap;
`;

export { StudentListTextWrapper, StudentListTitle, StudentListText, StudentListWrapper };
