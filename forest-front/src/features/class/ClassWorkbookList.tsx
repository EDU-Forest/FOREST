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
import Loading from "@/components/Loading/Loading";
import { IClassWorkbooks } from "@/types/ClassWorkbooks";

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

  const { data: workbooks, isLoading } = useClassWorkbookListQuery(classId, type);

  return (
    <div style={{ marginTop: "2rem" }}>
      {isLoading ? (
        <Loading width={8} height={8} />
      ) : (
        <Swiper breakpoints={breakpoints} navigation={true} modules={[Navigation]}>
          {workbooks &&
            workbooks?.map((item: IClassWorkbooks) => (
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
      )}
    </div>
  );
}
