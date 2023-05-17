import { WorkbookType } from "@/types/Workbook";
import WorkbookList from "./WorkbookList";

interface IProps {
  list: WorkbookType[];
}

function UsedWorkbook({ list }: IProps) {
  return (
    <div>
      <WorkbookList list={list} isWorkbookPage />
    </div>
  );
}

export default UsedWorkbook;
