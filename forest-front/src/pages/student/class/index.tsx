import StudentNav from "@/components/Nav/StudentNav";
import ClassSelect from "@/features/class/ClassSelect";
import ClassSummary from "@/features/class/ClassSummary";
import ClassWorkbook from "@/features/class/ClassWorkbook";
import { Container, FullScreen } from "@/styles/container";
import { Title } from "@/styles/text";

export default function StudentClass() {
  return (
    <FullScreen>
      <StudentNav nowLocation={"class"} />
      <Container padding={3}>
        <ClassSelect isStudent />
        <ClassSummary isStudent />
        <Title>문제집</Title>
        <ClassWorkbook />
      </Container>
    </FullScreen>
  );
}
