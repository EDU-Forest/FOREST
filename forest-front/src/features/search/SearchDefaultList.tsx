import CommonWorkbook from "@/components/Workbook/CommonWorkbook";
import {
  SearchTitle,
  SearchDefaultWrapper,
  SearchDefalutListWrapper,
  PopularOption,
  PopularOptionItem,
} from "./SearchList.style";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/swiper.min.css";
import { breakpoints } from "@/styles/theme";
import { useState } from "react";
import usePopularWorkbookListQuery from "@/apis/search/usePopularWorkbookListQuery";
import useRecentWorkbookListQuery from "@/apis/search/useRecentWorkbookListQuery";

export default function SearchDefaultList() {
  const [sortType, setSortType] = useState<string>("bookmark");
  const changeSort = (value: string) => {
    setSortType(value);
  };

  const popularList: SearchWorkbook[] = usePopularWorkbookListQuery(sortType).data?.workbookList;
  const recentList: SearchWorkbook[] = useRecentWorkbookListQuery().data?.workbookList;

  return (
    <SearchDefaultWrapper>
      <SearchTitle>
        최고 인기 문제집 ⭐
        <PopularOption>
          <PopularOptionItem
            selected={sortType === "bookmark" ? true : false}
            onClick={() => changeSort("bookmark")}
          >
            좋아요 순
          </PopularOptionItem>
          <PopularOptionItem
            selected={sortType === "scrap" ? true : false}
            onClick={() => changeSort("scrap")}
          >
            사용 순
          </PopularOptionItem>
        </PopularOption>
      </SearchTitle>

      <SearchDefalutListWrapper>
        <Swiper breakpoints={breakpoints} navigation={true} modules={[Navigation]}>
          {popularList?.map((item) => (
            <SwiperSlide key={item.workbookId}>
              <CommonWorkbook
                id={item.workbookId}
                title={item.title}
                bookmarkCount={item.bookmarkCount}
                scrapCount={item.scrapCount}
                isBookmarked={item.isBookmarked}
                workbookImgPath={item.workbookImgPath}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </SearchDefalutListWrapper>
      <SearchTitle>최신 등록 문제집 ⭐</SearchTitle>
      <SearchDefalutListWrapper>
        <Swiper breakpoints={breakpoints} navigation={true} modules={[Navigation]}>
          {recentList?.map((item) => (
            <SwiperSlide key={item.workbookId}>
              <CommonWorkbook
                id={item.workbookId}
                title={item.title}
                bookmarkCount={item.bookmarkCount}
                scrapCount={item.scrapCount}
                isBookmarked={item.isBookmarked}
                workbookImgPath={item.workbookImgPath}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </SearchDefalutListWrapper>
    </SearchDefaultWrapper>
  );
}
