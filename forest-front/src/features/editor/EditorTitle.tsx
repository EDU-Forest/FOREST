import { AiFillCaretDown } from "react-icons/ai";
import { EditorSelectedTitle, EditorTitleBox } from "./Editor.style";
import { useDispatch } from "react-redux";
import { controlClassDropdown } from "@/stores/class/classModal";
import ClassSelectDropdown from "../class/ClassSelectDropdown";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import EditorSelectDropdown from "./EditorSelectDropdown";

export default function EditorTitle() {
  const dispatch = useDispatch();
  const { isOpenDropdown } = useSelector((state: RootState) => state.classModal);

  return (
    <EditorTitleBox>
      <EditorSelectedTitle>
        {"Test"}
        <AiFillCaretDown onClick={() => dispatch(controlClassDropdown())} className="icon" />
      </EditorSelectedTitle>
      {/* 추후 확인 */}
      {isOpenDropdown && <EditorSelectDropdown nowClassId={1} isStudent={true} />}
    </EditorTitleBox>
  );
}
