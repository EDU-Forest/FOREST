import { useRouter } from "next/router";

import CommonWorkbook from "@/components/Workbook/CommonWorkbook";
import { WorkbookType } from "./LikeWorkbook";
import { StyledWorkbookListBox } from "./Workbook.style";

interface IProps {
  list: WorkbookType[];
}

function WorkbookList({ list }: IProps) {
  const router = useRouter();

  const handleClickWorkbook = (id: number) => {
    router.push({
      pathname: `/workbook/[wId]`,
      query: {wId: id},
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
            likes={item?.likeCnt}
            used={item?.usedCnt}
            clickAction={handleClickWorkbook}
          />
        );
      })}
    </StyledWorkbookListBox>
  );
}

export default WorkbookList;
