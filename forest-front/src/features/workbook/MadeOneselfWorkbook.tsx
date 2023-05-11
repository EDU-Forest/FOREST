import { WorkbookType } from "@/types/Workbook";
import WorkbookList from "./WorkbookList";
import { useEffect } from "react";

interface IProps {
  list: WorkbookType[];
}

function MadeOneselfWorkbook({ list }: IProps) {
  useEffect(() => {
    console.log(list);
  }, []);
  return (
    <div>
      <WorkbookList list={list} isWorkbookPage />
    </div>
  );
}

export default MadeOneselfWorkbook;
