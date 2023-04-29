import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/swiper.min.css";
import { breakpoints } from "@/styles/theme";
import CommonWorkbook from "@/components/Workbook/CommonWorkbook";
import { useDispatch } from "react-redux";
import { setStudy } from "@/stores/class/classInfo";
import { closeAllModal } from "@/stores/class/classModal";

const workbooks: ClassWorkbooks[] = [
  { id: 1, title: "킹규림의 수능 100제", workbookImgPath: "", isFinished: false },
  { id: 2, title: "양GPT 100분 활용", workbookImgPath: "", isFinished: false },
  { id: 3, title: "킹규림의 수능 100제", workbookImgPath: "", isFinished: false },
  { id: 4, title: "양GPT 100분 활용", workbookImgPath: "", isFinished: false },
  { id: 5, title: "킹규림의 수능 100제", workbookImgPath: "", isFinished: false },
  { id: 6, title: "양GPT 100분 활용", workbookImgPath: "", isFinished: false },
  { id: 7, title: "킹규림의 수능 100제", workbookImgPath: "", isFinished: false },
  { id: 8, title: "양GPT 100분 활용", workbookImgPath: "", isFinished: false },
];

export default function ClassWorkbookList() {
  const dispatch = useDispatch();
  const changeWorkbookSummary = (id: number) => {
    dispatch(setStudy(id));
    dispatch(closeAllModal());
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <Swiper breakpoints={breakpoints} navigation={true} modules={[Navigation]}>
        {workbooks.map((item) => (
          <SwiperSlide key={item.id}>
            <CommonWorkbook id={item.id} title={item.title} clickAction={changeWorkbookSummary} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
