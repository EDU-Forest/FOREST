import { AiFillCaretDown } from "react-icons/ai";
import { EditorSelectedTitle, EditorTitleBox } from "./Editor.style";
import { useDispatch } from "react-redux";
import { controlClassDropdown } from "@/stores/class/classModal";
import ClassSelectDropdown from "../class/ClassSelectDropdown";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import EditorSelectDropdown from "./EditorSelectDropdown";
import { IWorkbookBySelf } from "@/types/Workbook";

export default function EditorTitle() {
  const dispatch = useDispatch();
  const { isOpenDropdown } = useSelector((state: RootState) => state.classModal);

  return (
    <EditorTitleBox>
      <EditorSelectedTitle>
        {"Test"}
        <AiFillCaretDown onClick={() => dispatch(controlClassDropdown())} className="icon" />
      </EditorSelectedTitle>
      {/* nowWorkbookId 같은 거 있어야 할 듯 */}
      {isOpenDropdown && <EditorSelectDropdown />}
    </EditorTitleBox>
  );
}
