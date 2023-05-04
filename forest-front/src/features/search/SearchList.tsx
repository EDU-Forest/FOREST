import CommonWorkbook from "@/components/Workbook/CommonWorkbook";
import { SearchListWrapper, SearchListItem } from "./SearchList.style";
import useSearchWorkbookQuery from "@/apis/search/useSearchWorkbookQuery";

interface Iprops {
  keyword: string;
}

const searchList: SearchWorkbook[] = [
  {
    workbookId: 1,
    title: "킹규림의 수능 100제",
    workbookImgPath: "",
    bookmarkCount: 10,
    scrapCount: 7,
    methodType: "PATCH",
    isScraped: false,
    isBookmarked: false,
  },
  {
    workbookId: 2,
    title: "킹규림의 수능 100제",
    workbookImgPath: "",
    bookmarkCount: 10,
    scrapCount: 7,
    methodType: "PATCH",
    isScraped: false,
    isBookmarked: false,
  },
  {
    workbookId: 3,
    title: "킹규림의 수능 100제",
    workbookImgPath: "",
    bookmarkCount: 10,
    scrapCount: 7,
    methodType: "PATCH",
    isScraped: true,
    isBookmarked: true,
  },
  {
    workbookId: 4,
    title: "킹규림의 수능 100제",
    workbookImgPath: "",
    bookmarkCount: 10,
    scrapCount: 7,
    methodType: "PATCH",
    isScraped: false,
    isBookmarked: false,
  },
  {
    workbookId: 5,
    title: "킹규림의 수능 100제",
    workbookImgPath: "",
    bookmarkCount: 10,
    scrapCount: 7,
    methodType: "PATCH",
    isScraped: false,
    isBookmarked: true,
  },
];

export default function SearchList({ keyword }: Iprops) {
  console.log(keyword);
  const { workbookList } = useSearchWorkbookQuery(keyword).data;

  return (
    <SearchListWrapper>
      {workbookList?.map((item: SearchWorkbook) => (
        <SearchListItem key={item.workbookId}>
          <CommonWorkbook
            id={item.workbookId}
            title={item.title}
            bookmarkCount={item.bookmarkCount}
            scrapCount={item.scrapCount}
          />
        </SearchListItem>
      ))}
    </SearchListWrapper>
  );
}
