import CommonWorkbook from "@/components/Workbook/CommonWorkbook";
import { SearchTitle, SearchListWrapper } from "./SearchList.style";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/swiper.min.css";

const swiperStyle = `
.swiper-wrapper { 
  display: -webkit-inline-box 
}
.swiper-button-prev{
  width: 20px;
  height: 20px;
  top: 60px;
  margin-top: -5px;
  color: #ff5050;
}
.swiper-button-next{         
  width: 20px;
  height: 20px;
  margin-top: -5px;
  color: #ff5050;
}

`;

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
];
export default function SearchList() {
  return (
    <>
      <SearchTitle>최고 인기 문제집 ⭐</SearchTitle>
      <SearchListWrapper>
        <Swiper
          slidesPerView={4}
          className="static flex w-[1050px] justify-center mobile:w-full"
          navigation={true}
          modules={[Navigation]}
          // css={[swiperStyle]}
        >
          {popularList.map((item, idx) => (
            <SwiperSlide key={idx}>
              <CommonWorkbook title={item.title} likes={item.likes} used={item.used} />
            </SwiperSlide>
          ))}
        </Swiper>
      </SearchListWrapper>
    </>
  );
}
