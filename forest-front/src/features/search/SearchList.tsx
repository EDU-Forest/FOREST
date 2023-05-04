import CommonWorkbook from "@/components/Workbook/CommonWorkbook";
import { SearchListWrapper, SearchListItem } from "./SearchList.style";
import useSearchWorkbookQuery from "@/apis/search/useSearchWorkbookQuery";
import { useRouter } from "next/router";

interface Iprops {
  keyword: string;
}

export default function SearchList({ keyword }: Iprops) {
  const router = useRouter();
  const { workbookList } = useSearchWorkbookQuery(keyword).data;

  const goToDetail = (id: number) => {
    router.push(`/workbook/${id}`);
  };

  return (
    <SearchListWrapper>
      {workbookList?.map((item: SearchWorkbook) => (
        <SearchListItem key={item.workbookId}>
          <CommonWorkbook
            id={item.workbookId}
            title={item.title}
            bookmarkCount={item.bookmarkCount}
            scrapCount={item.scrapCount}
            isBookmarked={item.isBookmarked}
            workbookImgPath={item.workbookImgPath}
            methodType={item.methodType}
            clickAction={() => goToDetail(item.workbookId)}
          />
        </SearchListItem>
      ))}
    </SearchListWrapper>
  );
}
