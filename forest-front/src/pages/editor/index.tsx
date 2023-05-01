import EditorNav from "@/components/Nav/EditorNav";
import ImgCropper from "@/features/editor/ImgCropper";
import ImgEditor from "@/features/editor/ImgEditor";
import PdfViewer from "@/features/editor/PdfViewer";
import { Container, FullScreen } from "@/styles/container";

export default function Editor() {
  return (
    <FullScreen>
      <EditorNav />
      <Container isEditor>
        {/* <ImgCropper /> */}
        <PdfViewer />
        {/* <ImgEditor /> */}
      </Container>
    </FullScreen>
  );
}
