import EditorNav from "@/components/Nav/EditorNav";
import PdfViewer from "@/features/editor/PdfViewer";
import { Container, FullScreen } from "@/styles/container";

export default function Editor() {
  return (
    <FullScreen>
      <EditorNav />
      <Container isEditor>
        하하하하하하하 아직도 성공을 못하다니!!!
        <PdfViewer />
      </Container>
    </FullScreen>
  );
}
