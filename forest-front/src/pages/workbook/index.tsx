import useWorkbookListQuery from "@/apis/workbook/useWorkbookListQuery";
import TeacherNav from "@/components/Nav/TeacherNav";
import { StyledFullSectionBox } from "@/features/dashboard/Dashboard.style";
import LikeWorkbook from "@/features/workbook/LikeWorkbook";
import MadeOneselfWorkbook from "@/features/workbook/MadeOneselfWorkbook";
import UsedWorkbook from "@/features/workbook/UsedWorkbook";
import WorkbookTab from "@/features/workbook/WorkbookTab";
import { Container, FullScreen } from "@/styles/container";
import withAuth from "@/utils/withAuth";
import { useEffect, useState } from "react";

function Workbook() {
  const [selectedType, setSelectedType] = useState("like");

  const { data: { workbookList: list } = { workbookList: [] }, refetch } =
    useWorkbookListQuery(selectedType);

  useEffect(() => {
    refetch();
  }, [selectedType]);

  return (
    <FullScreen>
      <TeacherNav nowLocation={"workbook"} />
      <Container padding={2.5}>
        <StyledFullSectionBox padding={40} tabletPadding={24}>
          <WorkbookTab selectedType={selectedType} setSelectedType={setSelectedType} />
          {selectedType === "like" ? (
            <LikeWorkbook list={list} />
          ) : selectedType === "use" ? (
            <UsedWorkbook list={list} />
          ) : (
            selectedType === "own" && <MadeOneselfWorkbook list={list} />
          )}
        </StyledFullSectionBox>
      </Container>
    </FullScreen>
  );
}

export default withAuth(Workbook);
