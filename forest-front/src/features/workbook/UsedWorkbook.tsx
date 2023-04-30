import { WorkbookType } from "@/types/Workbook";
import WorkbookList from "./WorkbookList";

function UsedWorkbook() {
  // 더미
  const list: WorkbookType[] = [
    { id: 1, cover: "", title: "수능 100제", likeCnt: 12, usedCnt: 4 },
    { id: 2, cover: "", title: "수능 100제", likeCnt: 12, usedCnt: 4 },
    { id: 3, cover: "", title: "수능 100제", likeCnt: 12, usedCnt: 4 },
    { id: 4, cover: "", title: "수능 100제", likeCnt: 12, usedCnt: 4 },
    { id: 5, cover: "", title: "수능 100제", likeCnt: 12, usedCnt: 4 },
    { id: 6, cover: "", title: "수능 100제", likeCnt: 12, usedCnt: 4 },
  ];

  return (
    <div>
      <WorkbookList list={list} />
    </div>
  );
}

export default UsedWorkbook;
