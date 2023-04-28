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
  likes?: number;
  used?: number;
  clickAction?: (id: number) => void;
}

export default function CommonWorkbook({ id, title, likes, used, clickAction }: Iprops) {
  return (
    <WorkbookCard>
      <WorkbookImg src="/images/workbook.png" onClick={() => clickAction && clickAction(id)} />
      <WorkbookTitle onClick={() => clickAction && clickAction(id)}>{title}</WorkbookTitle>
      {likes && (
        <WorkbookContentWrapper>
          <WorkbookIcon>🧡</WorkbookIcon>
          <WorkbookContent>{likes}</WorkbookContent>
          <WorkbookIcon>📝</WorkbookIcon>
          <WorkbookContent>{used}</WorkbookContent>
        </WorkbookContentWrapper>
      )}
    </WorkbookCard>
  );
}
