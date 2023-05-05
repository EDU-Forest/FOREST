import { AiFillCaretDown } from "react-icons/ai";
import { EditorSelectedTitle, EditorTitleBox } from "./Editor.style";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import EditorSelectDropdown from "./EditorSelectDropdown";
import { controlEditorDropdown } from "@/stores/editor/editorModal";
import { useEffect, useState } from "react";

export default function EditorTitle() {
  const dispatch = useDispatch();
  // const { isOpenDropdown } = useSelector((state: RootState) => state.editorModal);
  const [controlDropdown, setControlDropdown] = useState(false);
  const { curWorkbookIdx, workbooksBySelf } = useSelector(
    (state: RootState) => state.editorWorkbook,
  );

  useEffect(() => {
    console.log(workbooksBySelf, curWorkbookIdx);
  }, []);

  return (
    <EditorTitleBox>
      <EditorSelectedTitle>
        {workbooksBySelf[curWorkbookIdx].title}
        {/* <AiFillCaretDown onClick={() => dispatch(controlEditorDropdown())} className="icon" /> */}
        <AiFillCaretDown onClick={() => setControlDropdown(!controlDropdown)} className="icon" />
      </EditorSelectedTitle>
      {/* nowWorkbookId 같은 거 있어야 할 듯 */}
      {controlDropdown && <EditorSelectDropdown setControlDropdown={setControlDropdown} />}
    </EditorTitleBox>
  );
}
