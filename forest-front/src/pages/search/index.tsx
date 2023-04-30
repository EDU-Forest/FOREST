import TeacherNav from "@/components/Nav/TeacherNav";
import SearchContainer from "@/features/search/SearchContainer";
import { Container, FullScreen } from "@/styles/container";

export default function Search() {
  return (
    <FullScreen>
      <TeacherNav nowLocation={"search"} />
      <Container>
        <SearchContainer />
      </Container>
    </FullScreen>
  );
}
