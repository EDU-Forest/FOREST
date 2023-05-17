import CommonWorkbook from "@/components/Workbook/CommonWorkbook";
import { SearchListWrapper, SearchListItem } from "./SearchList.style";
import useSearchWorkbookQuery from "@/apis/search/useSearchWorkbookQuery";
import { useRouter } from "next/router";
import Loading from "@/components/Loading/Loading";
import { ISearchWorkbook } from "@/types/Workbook";

interface Iprops {
  keyword: string;
}

export default function SearchList({ keyword }: Iprops) {
  const router = useRouter();
  const { data, isLoading } = useSearchWorkbookQuery(keyword);

  const goToDetail = (id: number) => {
    router.push(`/workbook/${id}`, undefined, { shallow: true });
  };

  return (
    <SearchListWrapper>
      {isLoading ? (
        <Loading width={15} height={15} />
      ) : (
        <>
          {data?.workbookList?.map((item: ISearchWorkbook) => (
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
        </>
      )}
    </SearchListWrapper>
  );
}
