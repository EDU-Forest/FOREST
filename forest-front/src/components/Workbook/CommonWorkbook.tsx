import {
  WorkbookCard,
  WorkbookContent,
  WorkbookContentWrapper,
  WorkbookIcon,
  WorkbookImg,
  WorkbookTitle,
} from "./Workbook.style";

interface Iprops {
  title: string;
  likes?: number;
  used?: number;
}

export default function CommonWorkbook({ title, likes, used }: Iprops) {
  return (
    <WorkbookCard>
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
