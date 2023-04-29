import RadioBtn from "@/components/Button/RadioBtn";
import StudentNav from "@/components/Nav/StudentNav";
import ClassSelect from "@/features/class/ClassSelect";
import ClassWorkbook from "@/features/class/ClassWorkbook";
import ClassSummaryStudent from "@/features/class/student/ClassSummaryStudent";
import { Container, FullScreen } from "@/styles/container";
import { Title } from "@/styles/text";

export default function StudentClass() {
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
