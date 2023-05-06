import SmallBtn from "@/components/Button/SmallBtn";
import { DescriptiveFormBtn, DescriptiveFormWrapper } from "./DescriptiveForm.style";
import DescriptiveFormItem from "./DescriptiveFormItem";
import DescriptiveFormAnswer from "./DescriptiveFormAnswer";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useDescriptionQuery from "@/apis/class/analysis/useDescriptionQuery";
import Loading from "@/components/Loading/Loading";
import { useEffect, useState } from "react";
import useDescriptionScoring from "@/apis/class/analysis/useDescriptionScoring";
import useExamFinish from "@/apis/class/analysis/useExamFinish";

interface StudentPointList {
  studentNum: number;
  score: number;
}

export default function DescriptiveForm() {
  const { nowStudyId, studentPointList } = useSelector((state: RootState) => state.class);
  const [nowIdx, setNowIdx] = useState<number>(0);
  const scoringMutate = useDescriptionScoring().mutate;
  const finishMutate = useExamFinish().mutate;
  const { data, isLoading } = useDescriptionQuery(nowStudyId);

  const handleClick = () => {
    const newStudentPointList = [];

    const maxNum = data?.descript[nowIdx].studentList.length as number;

    for (let i = 0; i < maxNum; i++) {
      newStudentPointList.push({ studentNum: i + 1, score: studentPointList[`score_${i}`] });
    }
    console.log("newStudentPointList", newStudentPointList);
    let isLast;
    if (nowIdx === (data?.count as number) - 1) {
      isLast = true;
    } else {
      setNowIdx(nowIdx + 1);
      isLast = false;
    }

    const payload = {
      problemListId: data?.descript[nowIdx].problemListId as number,
      studyId: nowStudyId,
      point: data?.descript[nowIdx].point as number,
      isLast: isLast,
      studentPointList: newStudentPointList, // 얘가 문제....
    };
    scoringMutate(payload);

    if (isLast) {
      finishMutate(nowStudyId);
    }
  };

  return (
    <DescriptiveFormWrapper>
      {isLoading ? (
        <Loading width={10} height={10} />
      ) : (
        <>
          {!data ? (
            <>데이터 없음</>
          ) : (
            <>
              <DescriptiveFormBtn>
                <span>1 / {data?.count}</span>
                <SmallBtn
                  children={nowIdx === data?.count ? "다음" : "완료"}
                  onClick={handleClick}
                />
              </DescriptiveFormBtn>

              <DescriptiveFormItem
                title={data?.descript[nowIdx].title}
                keywordList={data?.descript[nowIdx].keywordList}
                point={data?.descript[nowIdx].point}
              />
              <DescriptiveFormAnswer
                keywordNum={data?.descript[nowIdx].keywordNum}
                studentList={data?.descript[nowIdx].studentList}
                maxScore={data?.descript[nowIdx].point as number}
              />
            </>
          )}
        </>
      )}
    </DescriptiveFormWrapper>
  );
}
