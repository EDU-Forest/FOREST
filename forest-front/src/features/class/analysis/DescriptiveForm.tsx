import SmallBtn from "@/components/Button/SmallBtn";
import { DescriptiveFormBtn, DescriptiveFormWrapper } from "./DescriptiveForm.style";
import DescriptiveFormItem from "./DescriptiveFormItem";
import DescriptiveFormAnswer from "./DescriptiveFormAnswer";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useDescriptionQuery from "@/apis/class/analysis/useDescriptionQuery";
import Loading from "@/components/Loading/Loading";
import { useState } from "react";

export default function DescriptiveForm() {
  const { nowStudyId } = useSelector((state: RootState) => state.class);
  // 채점해야 하는 문제 몇개인지 / 다음 문제 요청
  const [nowIdx, setNowIdx] = useState<number>(0);

  const { data, isLoading } = useDescriptionQuery(nowStudyId);

  // 버튼 문구 다음 / 종료
  const handleClick = () => {
    // 다음으로 !
  };

  return (
    <DescriptiveFormWrapper>
      {isLoading ? (
        <Loading width={10} height={10} />
      ) : (
        <>
          <DescriptiveFormBtn>
            <span>1 / 4</span>
            <SmallBtn children={"다음"} onClick={handleClick} />
          </DescriptiveFormBtn>

          <DescriptiveFormItem
            title={data?.descript[nowIdx].title}
            keywordList={data?.descript[nowIdx].keywordList}
            point={data?.descript[nowIdx].point}
          />
          <DescriptiveFormAnswer
            keywordNum={data?.descript[nowIdx].keywordNum}
            studentList={data?.descript[nowIdx].studentList}
          />
        </>
      )}
    </DescriptiveFormWrapper>
  );
}
