import { WorkbookType } from "@/types/Workbook";
import WorkbookList from "./WorkbookList";

interface IProps {
  list: WorkbookType[];
}

function MadeOneselfWorkbook({ list }: IProps) {
  return (
    <div>
      <WorkbookList list={list} />
    </div>
  );
}

export default MadeOneselfWorkbook;
