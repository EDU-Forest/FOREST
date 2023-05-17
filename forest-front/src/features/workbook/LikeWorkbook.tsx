import { WorkbookType } from "@/types/Workbook";
import WorkbookList from "./WorkbookList";

interface IProps {
  list: WorkbookType[];
}

function LikeWorkbook({ list }: IProps) {
  return (
    <div>
      <WorkbookList list={list} isWorkbookPage />
    </div>
  );
}

export default LikeWorkbook;
