import { StyledRoundSolid600Btn } from "@/components/Button/Btn.style";
import { EditorBtnsBox } from "./Editor.style";
import useEditorSave from "@/hooks/editor/useEditorSave";

function EditorBtns() {
  const { editorSave } = useEditorSave();

  const handleClickSave = () => {
    editorSave();
  };

  return (
    <EditorBtnsBox>
      <StyledRoundSolid600Btn onClick={handleClickSave}>완료</StyledRoundSolid600Btn>
    </EditorBtnsBox>
  );
}

export default EditorBtns;
