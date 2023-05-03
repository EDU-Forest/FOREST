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

const popularList: SearchWorkbook[] = [
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

export default function SearchDefaultList() {
  const [sortType, setSortType] = useState<string>("bookmark");
  const changeSort = (value: string) => {
    setSortType(value);
  };

  const list = usePopularWorkbookListQuery(sortType).data;
  console.log("요요요", list);
  const list2 = useRecentWorkbookListQuery().data;
  console.log("하하하", list2);

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
        {/* <Swiper breakpoints={breakpoints} navigation={true} modules={[Navigation]}>
          {popularList?.map((item) => (
            <SwiperSlide key={item.workbookId}>
              <CommonWorkbook
                id={item.workbookId}
                title={item.title}
                bookmarkCount={item.bookmarkCount}
                scrapCount={item.scrapCount}
                isBookmarked={item.isBookmarked}
              />
            </SwiperSlide>
          ))}
        </Swiper> */}
      </SearchDefalutListWrapper>
      <SearchTitle>최신 등록 문제집 ⭐</SearchTitle>
      <SearchDefalutListWrapper>
        <Swiper breakpoints={breakpoints} navigation={true} modules={[Navigation]}>
          {popularList.map((item) => (
            <SwiperSlide key={item.workbookId}>
              <CommonWorkbook
                id={item.workbookId}
                title={item.title}
                bookmarkCount={item.bookmarkCount}
                scrapCount={item.scrapCount}
                isBookmarked={item.isBookmarked}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </SearchDefalutListWrapper>
    </SearchDefaultWrapper>
  );
}
