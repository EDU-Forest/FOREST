import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/swiper.min.css";
import { breakpoints } from "@/styles/theme";
import CommonWorkbook from "@/components/Workbook/CommonWorkbook";
import { useDispatch } from "react-redux";
import { setStudy } from "@/stores/class/classInfo";
import { closeAllModal } from "@/stores/class/classModal";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useClassWorkbookListQuery from "@/apis/class/useClassWorkbookListQuery";
import { ClassWorkbooks } from "@/types/ClassWorkbooks";

interface Iprops {
  type: string;
}

export default function ClassWorkbookList({ type }: Iprops) {
  const dispatch = useDispatch();
  const classId = useSelector((state: RootState) => state.class.nowClassId);
  const changeWorkbookSummary = (id: number) => {
    dispatch(setStudy(id));
    dispatch(closeAllModal());
  };

  const workbooks: ClassWorkbooks[] = useClassWorkbookListQuery(classId, type).data?.workbookList;

  return (
    <div style={{ marginTop: "2rem" }}>
      <Swiper breakpoints={breakpoints} navigation={true} modules={[Navigation]}>
        {workbooks?.map((item) => (
          <SwiperSlide key={item.studyId}>
            <CommonWorkbook
              id={item.studyId}
              title={item.title}
              clickAction={() => changeWorkbookSummary(item.studyId)}
              workbookImgPath={item.workbookImgPath}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
