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
    <WorkbookCard onClick={() => clickAction && clickAction(id)}>
      <WorkbookImg src="/images/workbook.png" />
      <WorkbookTitle>{title}</WorkbookTitle>
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
