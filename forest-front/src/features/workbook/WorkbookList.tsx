import { useRouter } from "next/router";

import CommonWorkbook from "@/components/Workbook/CommonWorkbook";
import { StyledWorkbookListBox } from "./Workbook.style";
import { WorkbookType } from "@/types/Workbook";

interface IProps {
  list: WorkbookType[];
}

function WorkbookList({ list }: IProps) {
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
            key={item?.id}
            id={item?.id}
            title={item?.title}
            bookmarkCount={item?.likeCnt}
            scrapCount={item?.usedCnt}
            clickAction={handleClickWorkbook}
          />
        );
      })}
    </StyledWorkbookListBox>
  );
}

export default WorkbookList;