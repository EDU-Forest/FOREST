import EditorNav from "@/components/Nav/EditorNav";
import { Container, FullScreen } from "@/styles/container";

export default function Editor() {
  return (
    <FullScreen>
      <EditorNav />
      <Container isEditor></Container>
    </FullScreen>
  );
}
