import { RootState } from "@/stores/store";
import { AiFillCaretDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { EditorSelectedTitle, EditorTitleBox } from "./Editor.style";
import EditorSelectDropdown from "./EditorSelectDropdown";

interface IProps {
  editorSave: () => void;
  isSuccess: boolean;
  controlDropdown: boolean;
  setControlDropdown: (controlDropdown: boolean) => void;
  setIsWorkbookSwitchFail: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditorTitle({
  editorSave,
  isSuccess,
  controlDropdown,
  setControlDropdown,
  setIsWorkbookSwitchFail,
}: IProps) {
  const dispatch = useDispatch();
  // const { isOpenDropdown } = useSelector((state: RootState) => state.editorModal);
  const { curWorkbookTitle } = useSelector((state: RootState) => state.editorWorkbook);

  const controlDropdownHandler = (e: React.MouseEvent<HTMLElement | SVGElement>) => {
    e.stopPropagation();
    setControlDropdown(!controlDropdown);
  };

  return (
    <EditorTitleBox>
      <EditorSelectedTitle>
        <p onClick={controlDropdownHandler}>{curWorkbookTitle}</p>
        {/* <AiFillCaretDown onClick={() => dispatch(controlEditorDropdown())} className="icon" /> */}
        <AiFillCaretDown onClick={controlDropdownHandler} className="icon" />
      </EditorSelectedTitle>
      {/* nowWorkbookId 같은 거 있어야 할 듯 */}
      {controlDropdown && (
        <EditorSelectDropdown
          setControlDropdown={setControlDropdown}
          editorSave={editorSave}
          isSuccess={isSuccess}
          setIsWorkbookSwitchFail={setIsWorkbookSwitchFail}
        />
      )}
    </EditorTitleBox>
  );
}
