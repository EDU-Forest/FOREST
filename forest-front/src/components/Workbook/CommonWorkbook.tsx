import {
  WorkbookCard,
  WorkbookContent,
  WorkbookContentWrapper,
  WorkbookIcon,
  WorkbookImg,
  WorkbookTitle,
} from "./Workbook.style";

interface Iprops {
  id: number;
  title: string;
  bookmarkCount?: number;
  scrapCount?: number;
  clickAction?: (id: number) => void;
}

export default function CommonWorkbook({
  id,
  title,
  bookmarkCount,
  scrapCount,
  clickAction,
}: Iprops) {
  return (
    <WorkbookCard>
      <WorkbookImg src="/images/workbook.png" onClick={() => clickAction && clickAction(id)} />
      <WorkbookTitle onClick={() => clickAction && clickAction(id)}>{title}</WorkbookTitle>
      {bookmarkCount && (
        <WorkbookContentWrapper>
          <WorkbookContent bg>
            <span>{scrapCount} </span>
            명이 이용 중이에요
          </WorkbookContent>
          <div>
            <WorkbookIcon>🧡</WorkbookIcon>
            <WorkbookContent>{bookmarkCount}</WorkbookContent>
          </div>
        </WorkbookContentWrapper>
      )}
    </WorkbookCard>
  );
}
