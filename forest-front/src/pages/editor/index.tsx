import EditorNav from "@/components/Nav/EditorNav";
import PdfViewer from "@/features/editor/PdfViewer";
import { Container, FullScreen } from "@/styles/container";

export default function Editor() {
  return (
    <FullScreen>
      <EditorNav />
      <Container isEditor>
        <PdfViewer />
      </Container>
    </FullScreen>
  );
}
