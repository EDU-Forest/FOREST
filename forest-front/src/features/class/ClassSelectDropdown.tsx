import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import {
  ClassSelectDropdownContainer,
  ClassSelectDropdownEach,
  ClassSelectDropdownEachItem,
  ClassSelectDropdownAdd,
  ClassSelectCircle,
  ClassSelectNoClass,
} from "./ClassSelect.style";
import { setClass } from "@/stores/class/classInfo";
import { openAddClassModal } from "@/stores/class/classModal";
import useClassListQuery from "@/apis/class/useClassListQuery";
import Loading from "@/components/Loading/Loading";
import { textFormatter } from "@/utils";

interface Iprops {
  nowClassId: number;
  isStudent?: boolean;
}

export default function ClassSelectDropdown({ nowClassId, isStudent }: Iprops) {
  const dispatch = useDispatch();
  const { data: classList, isLoading } = useClassListQuery();

  const addClassModalHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(openAddClassModal());
  };

  return (
    <ClassSelectDropdownContainer>
      {isLoading ? (
        <Loading width={2} height={2} />
      ) : (
        <>
          {classList && classList?.length > 0 ? (
            <>
              <ClassSelectDropdownEach>
                {classList?.map((item) => (
                  <ClassSelectDropdownEachItem
                    key={item.classId}
                    onClick={() => dispatch(setClass(item))}
                  >
                    {item.classId === nowClassId && <ClassSelectCircle />}{" "}
                    {textFormatter(item.className)}
                  </ClassSelectDropdownEachItem>
                ))}
              </ClassSelectDropdownEach>
            </>
          ) : (
            <ClassSelectNoClass>존재하는 클래스가 없습니다</ClassSelectNoClass>
          )}
          {!isStudent && (
            <ClassSelectDropdownAdd onClick={addClassModalHandler}>
              + 새 클래스 추가
            </ClassSelectDropdownAdd>
          )}
        </>
      )}
    </ClassSelectDropdownContainer>
  );
}
