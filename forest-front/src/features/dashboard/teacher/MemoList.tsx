import useMemoDelete from "@/apis/dashboard/useMemoDelete";
import useMemoListQuery from "@/apis/dashboard/useMemoListQuery";
import arrangeDate from "@/utils/arrangeDate";
import { useEffect } from "react";
import {
  MemoContentText,
  StyledMemoListBox,
  StyledMemoListItemBox,
  StyledMemoListItemTopBox,
} from "./Memo.style";
import { Memo } from "@/types/Memo";

function MemoList() {
  const memoList: Memo[] = useMemoListQuery().data;
  const { mutate } = useMemoDelete();

  const handleResize = (): void => {
    // 화면이 리사이즈될 때마다 각 메모의 grid-end-row 변경
    document.querySelectorAll<HTMLElement>(".item").forEach((item: HTMLElement) => {
      item.style.gridRowEnd = `span ${item.clientHeight + 20}`;
    });
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [memoList]);

  const deleteMemo = (id: number) => {
    mutate(id);
  };

  return (
    <StyledMemoListBox>
      {memoList?.map((item) => {
        return (
          <StyledMemoListItemBox key={item.memoId} className="item">
            <StyledMemoListItemTopBox>
              <span>{arrangeDate(item.createdDate)}</span>
              <button onClick={() => deleteMemo(item.memoId)}>삭제</button>
            </StyledMemoListItemTopBox>
            <MemoContentText>{item.content}</MemoContentText>
          </StyledMemoListItemBox>
        );
      })}
    </StyledMemoListBox>
  );
}

export default MemoList;
