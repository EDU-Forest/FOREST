import CommonWorkbook from "@/components/Workbook/CommonWorkbook";
import { SearchListWrapper, SearchListItem } from "./SearchList.style";

interface Iprops {
  keyword: string;
}

const searchList = [
  {
    title: "킹규림의 수능 100제",
    likes: 10,
    used: 7,
  },
  {
    title: "킹규림의 수능 100제",
    likes: 10,
    used: 7,
  },
  {
    title: "킹규림의 수능 100제",
    likes: 10,
    used: 7,
  },
  {
    title: "킹규림의 수능 100제",
    likes: 10,
    used: 7,
  },
  {
    title: "양GPT 100분 활용",
    likes: 10,
    used: 7,
  },
  {
    title: "양GPT 100분 활용",
    likes: 10,
    used: 7,
  },
  {
    title: "양GPT 100분 활용",
    likes: 10,
    used: 7,
  },
  {
    title: "양GPT 100분 활용",
    likes: 10,
    used: 7,
  },
];

export default function SearchList({ keyword }: Iprops) {
  return (
    <SearchListWrapper>
      {searchList.map((item, idx) => (
        <SearchListItem>
          <CommonWorkbook title={item.title} likes={item.likes} used={item.used} />
        </SearchListItem>
      ))}
    </SearchListWrapper>
  );
}
