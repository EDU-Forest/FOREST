import { AiFillCaretDown } from "react-icons/ai";
import ClassSelectDropdown from "../ClassSelectDropdown";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { ClassSelectWrapper, ClassSelectedTitle } from "../ClassSelect.style";
import { useDispatch } from "react-redux";
import { controlTeacherClassDropdown } from "@/stores/teacher/teacherModalControl";

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

export default function ClassSelectTeacher() {
  const dispatch = useDispatch();
  const { isOpenDropdown } = useSelector((state: RootState) => state.teacherModalControl);

  const { nowClassName, nowClassId } = useSelector((state: RootState) => state.teacherClass);

  return (
    <ClassSelectWrapper>
      <ClassSelectedTitle>
        {nowClassName}
        <AiFillCaretDown onClick={() => dispatch(controlTeacherClassDropdown())} className="icon" />
      </ClassSelectedTitle>
      {isOpenDropdown && <ClassSelectDropdown classList={classList} nowClassId={nowClassId} />}
    </ClassSelectWrapper>
  );
}
