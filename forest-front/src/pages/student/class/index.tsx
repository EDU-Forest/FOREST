import StudentNav from "@/components/Nav/StudentNav";
import ClassSelect from "@/features/class/ClassSelect";
import ClassWorkbook from "@/features/class/ClassWorkbook";
import ClassSummaryStudent from "@/features/class/student/ClassSummaryStudent";
import { closeAllModal } from "@/stores/class/classModal";
import { Container, FullScreen } from "@/styles/container";
import { Title } from "@/styles/text";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function StudentClass() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeAllModal());
  }, []);

  return (
    <FullScreen>
      <StudentNav nowLocation={"class"} />
      <Container padding={3}>
        <ClassSelect isStudent />
        <ClassSummaryStudent />
        <Title>문제집</Title>
        <ClassWorkbook />
      </Container>
    </FullScreen>
  );
}
