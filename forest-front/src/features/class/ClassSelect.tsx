import { AiFillCaretDown } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { ClassSelectWrapper, ClassSelectedTitle } from "./ClassSelect.style";
import { useDispatch } from "react-redux";
import ClassSelectDropdown from "./ClassSelectDropdown";
import { controlClassDropdown } from "@/stores/class/classModal";

const classList: ClassList[] = [
  {
    classId: 1,
    name: "싸피 고등학교 1반",
  },
  {
    classId: 2,
    name: "싸피 고등학교 2반",
  },
  {
    classId: 3,
    name: "싸피 고등학교 3반",
  },
  {
    classId: 4,
    name: "싸피중 1반",
  },
  {
    classId: 5,
    name: "싸피중 2반",
  },
  {
    classId: 6,
    name: "싸피중 3반",
  },
];

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
      {isOpenDropdown && (
        <ClassSelectDropdown classList={classList} nowClassId={nowClassId} isStudent={isStudent} />
      )}
    </ClassSelectWrapper>
  );
}
