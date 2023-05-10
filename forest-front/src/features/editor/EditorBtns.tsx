import { StyledRoundSolid600Btn } from "@/components/Button/Btn.style";
import { RootState } from "@/stores/store";
import { MdSave } from "react-icons/md";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { EditorBtnsBox } from "./Editor.style";

interface IProps {
  editorSave: () => void;
  isLoading: boolean;
}

function EditorBtns({ editorSave, isLoading }: IProps) {
  const { isPointValidConfirm } = useSelector((state: RootState) => state.editorQuestions);
  const { isTitleValidConfirm } = useSelector((state: RootState) => state.editorQuestions);
  const { isAnswerValidConfirm } = useSelector((state: RootState) => state.editorQuestions);

  const handleClickSave = () => {
    editorSave();
  };

  return (
    <EditorBtnsBox>
      <StyledRoundSolid600Btn
        onClick={() =>
          isPointValidConfirm && isTitleValidConfirm && isAnswerValidConfirm && handleClickSave()
        }
        disabled={!isPointValidConfirm || !isTitleValidConfirm || !isAnswerValidConfirm}
      >
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
