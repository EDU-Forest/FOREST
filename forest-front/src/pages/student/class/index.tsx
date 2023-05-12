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
import { setFirstConnect } from "@/stores/class/classInfo";
import { closeAllModal, hideClassDropdown } from "@/stores/class/classModal";
import { RootState } from "@/stores/store";
import { Container, FullScreen } from "@/styles/container";
import { Title } from "@/styles/text";
import withAuth from "@/utils/auth/withAuth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function StudentClass() {
  const dispatch = useDispatch();
  const { nowClassId } = useSelector((state: RootState) => state.class);
  const { data } = useRecentStudyIdQuery(nowClassId);

  useEffect(() => {
    dispatch(closeAllModal());
  }, []);

  window.addEventListener("beforeunload", (event) => {
    event.preventDefault();
    event.returnValue = "";
    dispatch(setFirstConnect(true));
  });

  const hideDropdownHandler = () => {
    dispatch(hideClassDropdown());
  };

  return (
    <FullScreen onClick={hideDropdownHandler}>
      <StudentNav nowLocation={"class"} />
      <Container padding={3}>
        {nowClassId !== -1 ? (
          <>
            <ClassSelect isStudent />
            {!data ? (
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

export default withAuth(StudentClass);
