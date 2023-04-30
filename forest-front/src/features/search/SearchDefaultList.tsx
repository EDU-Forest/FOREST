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

const popularList: SearchWorkbook[] = [
  {
    id: 1,
    title: "킹규림의 수능 100제",
    workbookImgPath: "",
    bookmarkCount: 10,
    scrapCount: 7,
  },
  {
    id: 2,
    title: "킹규림의 수능 100제",
    workbookImgPath: "",
    bookmarkCount: 10,
    scrapCount: 7,
  },
  {
    id: 3,
    title: "킹규림의 수능 100제",
    workbookImgPath: "",
    bookmarkCount: 10,
    scrapCount: 7,
  },
  {
    id: 4,
    title: "킹규림의 수능 100제",
    workbookImgPath: "",
    bookmarkCount: 10,
    scrapCount: 7,
  },
  {
    id: 5,
    title: "킹규림의 수능 100제",
    workbookImgPath: "",
    bookmarkCount: 10,
    scrapCount: 7,
  },
  {
    id: 6,
    title: "킹규림의 수능 100제",
    workbookImgPath: "",
    bookmarkCount: 10,
    scrapCount: 7,
  },
];

export default function SearchDefaultList() {
  const [sortBookmark, setSortBookmark] = useState<boolean>(true);
  const changeSort = (value: boolean) => {
    setSortBookmark(value);
  };
  return (
    <SearchDefaultWrapper>
      <SearchTitle>
        최고 인기 문제집 ⭐
        <PopularOption>
          <PopularOptionItem selected={sortBookmark} onClick={() => changeSort(true)}>
            좋아요 순
          </PopularOptionItem>
          <PopularOptionItem selected={!sortBookmark} onClick={() => changeSort(false)}>
            사용 순
          </PopularOptionItem>
        </PopularOption>
      </SearchTitle>

      <SearchDefalutListWrapper>
        <Swiper breakpoints={breakpoints} navigation={true} modules={[Navigation]}>
          {popularList.map((item) => (
            <SwiperSlide key={item.id}>
              <CommonWorkbook
                id={item.id}
                title={item.title}
                bookmarkCount={item.bookmarkCount}
                scrapCount={item.scrapCount}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </SearchDefalutListWrapper>
      <SearchTitle>최신 등록 문제집 ⭐</SearchTitle>
      <SearchDefalutListWrapper>
        <Swiper breakpoints={breakpoints} navigation={true} modules={[Navigation]}>
          {popularList.map((item) => (
            <SwiperSlide key={item.id}>
              <CommonWorkbook
                id={item.id}
                title={item.title}
                bookmarkCount={item.bookmarkCount}
                scrapCount={item.scrapCount}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </SearchDefalutListWrapper>
    </SearchDefaultWrapper>
  );
}
