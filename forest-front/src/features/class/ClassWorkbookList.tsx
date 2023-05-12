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
import { AiOutlineCheckCircle } from "react-icons/ai";
import { CheckIconWrapper } from "./ClassWorkbook.style";

export default function ClassWorkbookList() {
  const dispatch = useDispatch();
  const { nowClassId, nowStudyId, nowStudyType } = useSelector((state: RootState) => state.class);
  const changeWorkbookSummary = (id: number) => {
    dispatch(setStudy(id));
    dispatch(closeAllModal());
  };

  const { data: workbooks, isLoading } = useClassWorkbookListQuery(nowClassId, nowStudyType);

  return (
    <div style={{ marginTop: "2rem" }}>
      {isLoading ? (
        <Loading width={8} height={8} />
      ) : (
        <Swiper breakpoints={breakpoints} navigation={true} modules={[Navigation]}>
          {workbooks?.map((item: IClassWorkbooks) => (
            <SwiperSlide key={item.studyId}>
              <CommonWorkbook
                id={item.studyId}
                title={item.title}
                clickAction={() => changeWorkbookSummary(item.studyId)}
                workbookImgPath={item.workbookImgPath}
              />
              {nowStudyId === item.studyId && (
                <CheckIconWrapper>
                  <AiOutlineCheckCircle />
                </CheckIconWrapper>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
