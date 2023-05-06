import TeacherNav from "@/components/Nav/TeacherNav";
import SearchContainer from "@/features/search/SearchContainer";
import { Container, FullScreen } from "@/styles/container";
import withAuth from "@/utils/withAuth";

function Search() {
  return (
    <FullScreen>
      <TeacherNav nowLocation={"search"} />
      <Container>
        <SearchContainer />
      </Container>
    </FullScreen>
  );
}

export default withAuth(Search);
