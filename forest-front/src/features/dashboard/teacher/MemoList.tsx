import { useEffect } from "react";
import { StyledMemoListBox, StyledMemoListItemBox, StyledMemoListItemTopBox } from "./Memo.style";
import useMemoListQuery from "@/apis/dashboard/useMemoListQuery";
import useMemoDelete from "@/apis/dashboard/useMemoDelete";

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
  }, []);

  const arrangeDate = (date: string) => {
    return date.replaceAll("T", " ").slice(0, 19);
  };

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
            <div>{item.content}</div>
          </StyledMemoListItemBox>
        );
      })}
    </StyledMemoListBox>
  );
}

export default MemoList;
