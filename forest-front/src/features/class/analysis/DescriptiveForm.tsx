import SmallBtn from "@/components/Button/SmallBtn";
import { DescriptiveFormBtn, DescriptiveFormWrapper } from "./DescriptiveForm.style";
import DescriptiveFormItem from "./DescriptiveFormItem";
import DescriptiveFormAnswer from "./DescriptiveFormAnswer";

export default function DescriptiveForm() {
  // 채점해야 하는 문제 몇개인지 / 다음 문제 요청
  // 버튼 문구 다음 / 종료
  return (
    <DescriptiveFormWrapper>
      <DescriptiveFormBtn>
        <span>1 / 4</span>
        <SmallBtn
          children={"다음"}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </DescriptiveFormBtn>
      <DescriptiveFormItem />
      <DescriptiveFormAnswer />
    </DescriptiveFormWrapper>
  );
}
