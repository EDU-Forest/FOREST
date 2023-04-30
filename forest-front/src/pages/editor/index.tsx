import EditorNav from "@/components/Nav/EditorNav";
import PdfViewer from "@/features/editor/PdfViewer";
import { Container, FullScreen } from "@/styles/container";

export default function Editor() {
  return (
    <FullScreen>
      <EditorNav />
      <Container isEditor>
        하하하하하하하
        <PdfViewer />
      </Container>
    </FullScreen>
  );
}
