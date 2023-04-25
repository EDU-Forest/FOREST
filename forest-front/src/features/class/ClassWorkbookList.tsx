import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/swiper.min.css";
import { breakpoints } from "@/styles/theme";
import CommonWorkbook from "@/components/Workbook/CommonWorkbook";

const workbookList = [
  {
    title: "킹규림의 수능 100제",
  },
  {
    title: "킹규림의 수능 100제",
  },
  {
    title: "킹규림의 수능 100제",
  },
  {
    title: "킹규림의 수능 100제",
  },
  {
    title: "양GPT 100분 활용",
  },
  {
    title: "양GPT 100분 활용",
  },
  {
    title: "양GPT 100분 활용",
  },
  {
    title: "양GPT 100분 활용",
  },
];

export default function ClassWorkbookList() {
  return (
    <div style={{ marginTop: "2rem" }}>
      <Swiper breakpoints={breakpoints} navigation={true} modules={[Navigation]}>
        {workbookList.map((item, idx) => (
          <SwiperSlide key={idx}>
            <CommonWorkbook title={item.title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
