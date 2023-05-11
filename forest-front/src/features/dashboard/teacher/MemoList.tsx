import useMemoDelete from "@/apis/dashboard/useMemoDelete";
import useMemoListQuery from "@/apis/dashboard/useMemoListQuery";
import Loading from "@/components/Loading/Loading";
import arrangeDate from "@/utils/arrangeDate";
import { useEffect } from "react";
import {
  MemoContentText,
  StyledMemoListBox,
  StyledMemoListItemBox,
  StyledMemoListItemTopBox,
} from "./Memo.style";

function MemoList() {
  const { data: memoList, isLoading } = useMemoListQuery();
  const { mutate } = useMemoDelete();

  const handleResize = (): void => {
    // 화면이 리사이즈될 때마다 각 메모의 grid-end-row 변경
    document.querySelectorAll<HTMLElement>(".item").forEach((item: HTMLElement) => {
      item.style.gridRowEnd = `span ${item.clientHeight + 20}`;
    });
  };

  const getRandomTime = (): number => {
    // 최소 0.1 ~ 최대 2
    return Math.random() * (1.5 - 0.1) + 0.1;
  };

  const getRandomColor = (): number => {
    // 최소 1 ~ 최대 3
    return Math.floor(Math.random() * 3) + 1;
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
      {isLoading ? (
        <Loading width={10} height={10} />
      ) : (
        <>
          {memoList?.map((item) => {
            return (
              <StyledMemoListItemBox
                key={item.memoId}
                className="item"
                randomTime={getRandomTime()}
                randomColor={getRandomColor()}
              >
                <StyledMemoListItemTopBox>
                  <span>{arrangeDate(item.createdDate)}</span>
                  <button onClick={() => deleteMemo(item.memoId)}>삭제</button>
                </StyledMemoListItemTopBox>
                <MemoContentText>{item.content}</MemoContentText>
              </StyledMemoListItemBox>
            );
          })}
        </>
      )}
    </StyledMemoListBox>
  );
}

export default MemoList;
