import CommonWorkbook from "@/components/Workbook/CommonWorkbook";
import { SearchTitle, SearchDefaultWrapper, SearchDefalutListWrapper } from "./SearchList.style";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/swiper.min.css";

const popularList = [
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

const breakpoints = {
  768: {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 20,
    loopFillGroupWithBlank: true,
  },
  1220: {
    slidesPerView: 5,
    slidesPerGroup: 5,
    spaceBetween: 40,
    loopFillGroupWithBlank: true,
  },
  1440: {
    slidesPerView: 5,
    slidesPerGroup: 5,
    spaceBetween: 68,
    loopFillGroupWithBlank: true,
  },
};

export default function SearchDefaultList() {
  return (
    <SearchDefaultWrapper>
      <SearchTitle>최고 인기 문제집 ⭐</SearchTitle>
      <SearchDefalutListWrapper>
        <Swiper breakpoints={breakpoints} navigation={true} modules={[Navigation]}>
          {popularList.map((item, idx) => (
            <SwiperSlide key={idx}>
              <CommonWorkbook title={item.title} likes={item.likes} used={item.used} />
            </SwiperSlide>
          ))}
        </Swiper>
      </SearchDefalutListWrapper>
      <SearchTitle>최신 등록 문제집 ⭐</SearchTitle>
      <SearchDefalutListWrapper>
        <Swiper breakpoints={breakpoints} navigation={true} modules={[Navigation]}>
          {popularList.map((item, idx) => (
            <SwiperSlide key={idx}>
              <CommonWorkbook title={item.title} likes={item.likes} used={item.used} />
            </SwiperSlide>
          ))}
        </Swiper>
      </SearchDefalutListWrapper>
    </SearchDefaultWrapper>
  );
}
