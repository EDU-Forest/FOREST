import { AiFillCaretDown } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { ClassSelectWrapper, ClassSelectedTitle } from "./ClassSelect.style";
import { useDispatch } from "react-redux";
import ClassSelectDropdown from "./ClassSelectDropdown";
import { controlClassDropdown } from "@/stores/class/classModal";

interface Iprops {
  isStudent?: boolean;
}

export default function ClassSelect({ isStudent }: Iprops) {
  const dispatch = useDispatch();
  const { isOpenDropdown } = useSelector((state: RootState) => state.classModal);

  const { nowClassName, nowClassId } = useSelector((state: RootState) => state.class);

  return (
    <ClassSelectWrapper>
      <ClassSelectedTitle>
        {nowClassName}
        <AiFillCaretDown onClick={() => dispatch(controlClassDropdown())} className="icon" />
      </ClassSelectedTitle>
      {isOpenDropdown && <ClassSelectDropdown nowClassId={nowClassId} isStudent={isStudent} />}
    </ClassSelectWrapper>
  );
}
