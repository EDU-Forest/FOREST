import { useRouter } from "next/router";

import CommonWorkbook from "@/components/Workbook/CommonWorkbook";
import { WorkbookType } from "@/types/Workbook";
import { StyledWorkbookListBox } from "./Workbook.style";

interface IProps {
  list: WorkbookType[];
  isWorkbookPage: boolean;
}

function WorkbookList({ list, isWorkbookPage }: IProps) {
  const router = useRouter();

  const handleClickWorkbook = (id: number) => {
    router.push({
      pathname: `/workbook/[wId]`,
      query: { wId: id },
    });
  };

  return (
    <StyledWorkbookListBox>
      {list.map((item) => {
        return (
          <CommonWorkbook
            key={`workbook-${item?.workbookId}`}
            id={item?.workbookId}
            title={item?.title}
            bookmarkCount={item?.bookmarkCount}
            isBookmarked={item.isBookmarked}
            scrapCount={item?.scrapCount}
            methodType={item?.isBookmarked ? "DELETE" : "POST"}
            clickAction={handleClickWorkbook}
            isWorkbookPage={isWorkbookPage}
            workbookImgPath={item?.workbookImgPath}
          />
        );
      })}
    </StyledWorkbookListBox>
  );
}

export default WorkbookList;
