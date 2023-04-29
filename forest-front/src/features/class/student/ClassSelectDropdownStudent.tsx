import { useDispatch } from "react-redux";
import {
  ClassSelectDropdownContainer,
  ClassSelectDropdownEach,
  ClassSelectDropdownEachItem,
  ClassSelectCircle,
} from "../ClassSelect.style";
import { setClass } from "@/stores/student/studentClass";

interface Iprops {
  classList: ClassList[];
  nowClassId: number;
}

export default function ClassSelectDropdownStudent({ classList, nowClassId }: Iprops) {
  const dispatch = useDispatch();
  const changeClass = (item: ClassList) => {
    dispatch(setClass(item));
  };

  return (
    <ClassSelectDropdownContainer>
      <ClassSelectDropdownEach>
        {classList?.map((item) => (
          <ClassSelectDropdownEachItem key={item.classId} onClick={() => changeClass(item)}>
            {item.classId === nowClassId && <ClassSelectCircle />} {item.name}
          </ClassSelectDropdownEachItem>
        ))}
      </ClassSelectDropdownEach>
    </ClassSelectDropdownContainer>
  );
}
