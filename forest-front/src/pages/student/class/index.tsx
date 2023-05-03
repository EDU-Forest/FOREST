import useRecentStudyIdQuery from "@/apis/class/useRecentStudyIdQuery";
import StudentNav from "@/components/Nav/StudentNav";
import ClassSelect from "@/features/class/ClassSelect";
import {
  ClassSummaryItemWrapperNoResult,
  ClassSummaryWrapper,
} from "@/features/class/ClassSummary.style";
import ClassWorkbook from "@/features/class/ClassWorkbook";
import NoClass from "@/features/class/NoClass";
import ClassSummaryStudent from "@/features/class/student/ClassSummaryStudent";
import { closeAllModal } from "@/stores/class/classModal";
import { RootState } from "@/stores/store";
import { Container, FullScreen } from "@/styles/container";
import { Title } from "@/styles/text";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function StudentClass() {
  const dispatch = useDispatch();
  const { nowClassId } = useSelector((state: RootState) => state.class);
  const studyId = useRecentStudyIdQuery(nowClassId).data;

  useEffect(() => {
    dispatch(closeAllModal());
  }, []);

  return (
    <FullScreen>
      <StudentNav nowLocation={"class"} />
      <Container padding={3}>
        {nowClassId !== -1 ? (
          <>
            <ClassSelect isStudent />
            {studyId < 1 ? (
              <ClassSummaryWrapper small>
                <ClassSummaryItemWrapperNoResult>
                  최근 진행한 스터디가 없습니다.
                </ClassSummaryItemWrapperNoResult>
              </ClassSummaryWrapper>
            ) : (
              <ClassSummaryStudent />
            )}
            <Title>문제집</Title>
            <ClassWorkbook />
          </>
        ) : (
          <NoClass />
        )}
      </Container>
    </FullScreen>
  );
}
