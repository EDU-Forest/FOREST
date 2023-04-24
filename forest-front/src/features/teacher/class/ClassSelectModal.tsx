import {
  ClassSelectModalContainer,
  ClassSelectModalEach,
  ClassSelectModalEachItem,
  ClassSelectModalAdd,
} from "./ClassSelect.style";

interface Iprops {
  allClass: string[];
}

export default function ClassSelectModal({ allClass }: Iprops) {
  return (
    <ClassSelectModalContainer>
      <ClassSelectModalEach>
        {allClass?.map((item, idx) => (
          <ClassSelectModalEachItem key={idx}>{item}</ClassSelectModalEachItem>
        ))}
      </ClassSelectModalEach>
      <ClassSelectModalAdd>+ 새 클래스 추가</ClassSelectModalAdd>
    </ClassSelectModalContainer>
  );
}
