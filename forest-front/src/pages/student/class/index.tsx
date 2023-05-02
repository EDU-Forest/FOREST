import StudentNav from "@/components/Nav/StudentNav";
import ClassSelect from "@/features/class/ClassSelect";
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
            <ClassSummaryStudent />
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
