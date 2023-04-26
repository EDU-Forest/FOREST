import { Title } from "@/styles/text";
import { StyledSectionBox } from "../Dashboard.style";
import DashboardClassList from "./DashboardClassList";

function DashboardClass() {
  return (
    <StyledSectionBox>
      <Title>나의 클래스</Title>
      <DashboardClassList />
    </StyledSectionBox>
  );
}

export default DashboardClass;
