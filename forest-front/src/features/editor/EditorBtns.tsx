import { StyledRoundSolid600Btn } from "@/components/Button/Btn.style";
import useEditorSave from "@/hooks/editor/useEditorSave";
import { MdSave } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import { EditorBtnsBox } from "./Editor.style";

interface IProps {
  editorSave: () => void;
  isLoading: boolean;
}

function EditorBtns({ editorSave, isLoading }: IProps) {
  const handleClickSave = () => {
    editorSave();
  };

  return (
    <EditorBtnsBox>
      <StyledRoundSolid600Btn onClick={handleClickSave}>
        {isLoading ? (
          <>
            <ClipLoader color="white" size={18} speedMultiplier={0.7} />
            <span>저장 중</span>
          </>
        ) : (
          <>
            <MdSave />
            <span>저장</span>
          </>
        )}
      </StyledRoundSolid600Btn>
    </EditorBtnsBox>
  );
}

export default EditorBtns;
