import CommonWorkbook from "@/components/Workbook/CommonWorkbook";
import { SearchTitle, SearchDefaultWrapper, SearchDefalutListWrapper } from "./SearchList.style";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/swiper.min.css";
import { breakpoints } from "@/styles/theme";

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
