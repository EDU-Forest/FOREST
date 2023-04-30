import TeacherNav from "@/components/Nav/TeacherNav";
import { StyledFullSectionBox } from "@/features/dashboard/Dashboard.style";
import LikeWorkbook from "@/features/workbook/LikeWorkbook";
import MadeOneselfWorkbook from "@/features/workbook/MadeOneselfWorkbook";
import UsedWorkbook from "@/features/workbook/UsedWorkbook";
import WorkbookTab from "@/features/workbook/WorkbookTab";
import { Container, FullScreen } from "@/styles/container";
import { useState } from "react";

export default function Workbook() {
  const [selectedType, setSelectedType] = useState("like");

  return (
    <FullScreen>
      <TeacherNav nowLocation={"workbook"} />
      <Container padding={2.5}>
        <StyledFullSectionBox padding={40} tabletPadding={24}>
          <WorkbookTab selectedType={selectedType} setSelectedType={setSelectedType} />
          {selectedType === "like" ? (
            <LikeWorkbook />
          ) : selectedType === "used" ? (
            <UsedWorkbook />
          ) : (
            selectedType === "madeOneself" && <MadeOneselfWorkbook />
          )}
        </StyledFullSectionBox>
      </Container>
    </FullScreen>
  );
}
