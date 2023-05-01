import EditorNav from "@/components/Nav/EditorNav";
import ImportingModal from "@/features/editor/ImportingModal";
import { RootState } from "@/stores/store";
import { Container, FullScreen } from "@/styles/container";
import { useSelector } from "react-redux";

export default function Editor() {
  const { isOpenModal } = useSelector((state: RootState) => state.editorModal);
  return (
    <FullScreen>
      <EditorNav />
      <Container isEditor>{isOpenModal && <ImportingModal />}</Container>
    </FullScreen>
  );
}
