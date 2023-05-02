import { useEffect } from "react";
import { StyledMemoListBox, StyledMemoListItemBox, StyledMemoListItemTopBox } from "./Memo.style";
import useMemoListQuery from "@/apis/dashboard/useMemoListQuery";

interface listType {
  id: number;
  content: string;
  date: string;
}

function MemoList() {
  const memoList: Memo[] = useMemoListQuery().data;
  console.log("memolist", memoList);

  // 더미
  const list: listType[] = [
    {
      id: 1,
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti quaerat fuga veniam cupiditate ullam suscipit mollitia praesentium laborum earum, dolore cum, rem amet beatae quos nemo libero voluptate tenetur nesciunt!",
      date: "2023.04.16 11:44",
    },
    {
      id: 2,
      content: "Lorem ip",
      date: "2023.04.16 11:44",
    },
    {
      id: 3,
      content: "Lorem ipsum dolor sit",
      date: "2023.04.16 11:44",
    },
    // {
    //   id: 4,
    //   content:
    //     "Lorem consectetur adipisicing elit. Corrupti quaerat fuga veniam cupiditate ullam suscipit mollitia praesentium laborum earum, dolore cum, rem amet beatae quos nemo libero voluptate tenetur nesciunt!",
    //   date: "2023.04.16 11:44",
    // },
    // {
    //   id: 5,
    //   content:
    //     "Lorem ipisicing elit. Corrupti quaerat fuga veniam cupiditate ullam suscipit mollitia praesentium laborum earum, dolore cum, rem amet beatae quos nemo libero voluptate tenetur nesciunt!",
    //   date: "2023.04.16 11:44",
    // },
    // {
    //   id: 6,
    //   content: "Lorem ipsumt!",
    //   date: "2023.04.16 11:44",
    // },
    // {
    //   id: 7,
    //   content:
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti quaerat fuga veniam cupiditate ullam suscipit mollitia praesentium laborum earum, dolore cum, rem amet beatae quos nemo libero voluptate tenetur nesciunt!",
    //   date: "2023.04.16 11:44",
    // },
    // {
    //   id: 8,
    //   content: "Lorem ip",
    //   //   content:
    //   //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti quaerat fuga veniam cupiditate ullam suscipit mollitia praesentium laborum earum, dolore cum, rem amet beatae quos nemo libero voluptate tenetur nesciunt!",
    //   date: "2023.04.16 11:44",
    // },
    // {
    //   id: 9,
    //   content: "Lorem ipsum dolor sit",
    //   date: "2023.04.16 11:44",
    // },
    // {
    //   id: 10,
    //   content:
    //     "Lorem consectetur adipisicing elit. Corrupti quaerat fuga veniam cupiditate ullam suscipit mollitia praesentium laborum earum, dolore cum, rem amet beatae quos nemo libero voluptate tenetur nesciunt!",
    //   date: "2023.04.16 11:44",
    // },
    // {
    //   id: 11,
    //   content:
    //     "Lorem ipisicing elit. Corrupti quaerat fuga veniam cupiditate ullam suscipit mollitia praesentium laborum earum, dolore cum, rem amet beatae quos nemo libero voluptate tenetur nesciunt!",
    //   date: "2023.04.16 11:44",
    // },
    // {
    //   id: 12,
    //   content: "Lorem ipsumt!",
    //   date: "2023.04.16 11:44",
    // },
  ];

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

  return (
    <StyledMemoListBox>
      {memoList?.map((item) => {
        return (
          <StyledMemoListItemBox key={item.memoId} className="item">
            <StyledMemoListItemTopBox>
              <span>{item.createdDate}</span>
              <button>삭제</button>
            </StyledMemoListItemTopBox>
            <div>{item.content}</div>
          </StyledMemoListItemBox>
        );
      })}
    </StyledMemoListBox>
  );
}

export default MemoList;
