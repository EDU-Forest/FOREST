import { AiFillCaretDown } from "react-icons/ai";
import ClassSelectDropdown from "../ClassSelectDropdown";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { ClassSelectWrapper, ClassSelectedTitle } from "../ClassSelect.style";
import { useDispatch } from "react-redux";
import { controlStudentClassDropdown } from "@/stores/student/studentModalControl";

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

export default function ClassSelectStudent() {
  const dispatch = useDispatch();
  const { isOpenDropdown } = useSelector((state: RootState) => state.studentModalControl);

  const { nowClassName, nowClassId } = useSelector((state: RootState) => state.teacherClass);

  return (
    <ClassSelectWrapper>
      <ClassSelectedTitle>
        {nowClassName}
        <AiFillCaretDown onClick={() => dispatch(controlStudentClassDropdown())} className="icon" />
      </ClassSelectedTitle>
      {isOpenDropdown && (
        <ClassSelectDropdown classList={classList} nowClassId={nowClassId} isStudent />
      )}
    </ClassSelectWrapper>
  );
}
