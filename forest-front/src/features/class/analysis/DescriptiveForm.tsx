import SmallBtn from "@/components/Button/SmallBtn";
import {
  DescriptiveFormBtn,
  DescriptiveFormUpperBox,
  DescriptiveFormWrapper,
  NoDescription,
} from "./DescriptiveForm.style";
import DescriptiveFormItem from "./DescriptiveFormItem";
import DescriptiveFormAnswer from "./DescriptiveFormAnswer";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useDescriptionQuery from "@/apis/class/analysis/useDescriptionQuery";
import Loading from "@/components/Loading/Loading";
import { useEffect, useState } from "react";
import useDescriptionScoring from "@/apis/class/analysis/useDescriptionScoring";
import useExamFinish from "@/apis/class/analysis/useExamFinish";

export default function DescriptiveForm() {
  const { nowStudyId, studentPointList } = useSelector((state: RootState) => state.class);
  const [nowIdx, setNowIdx] = useState<number>(0);
  const scoringMutate = useDescriptionScoring().mutate;
  const finishMutate = useExamFinish().mutate;
  const { data, isLoading } = useDescriptionQuery(nowStudyId);

  const handleClick = () => {
    const newStudentPointList = [];

    const maxNum = data?.data.descript[nowIdx].studentList.length as number;

    for (let i = 0; i < maxNum; i++) {
      newStudentPointList.push({ studentNum: i + 1, score: studentPointList[`score_${i}`] });
    }

    let isLast;
    if (nowIdx === (data?.data.count as number) - 1) {
      isLast = true;
    } else {
      setNowIdx(nowIdx + 1);
      isLast = false;
    }

    const payload = {
      problemListId: data?.data.descript[nowIdx].problemListId as number,
      studyId: nowStudyId,
      point: data?.data.descript[nowIdx].point as number,
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
          {data.status === "STUDY_END" && (
            <NoDescription>
              <img src="/images/Banner_Teacher.png" />
              <span>채점이 완료되었습니다.</span>
            </NoDescription>
          )}
          {data.status === "STUDY_NONE_RESULT_DESCRIPT_LIST" && (
            <NoDescription>
              <img src="/images/Banner_Teacher.png" />
              <span>서술형 문제가 없습니다.</span>
            </NoDescription>
          )}
          {data.status === "STUDY_SUCCESS_RESULT_DESCRIPT_LIST" && (
            <>
              <DescriptiveFormBtn>
                <span>1 / {data?.data.count}</span>
                <SmallBtn
                  children={nowIdx === data?.data.count ? "다음" : "완료"}
                  onClick={handleClick}
                />
              </DescriptiveFormBtn>

              <DescriptiveFormItem
                title={data?.data.descript[nowIdx].title}
                keywordList={data?.data.descript[nowIdx].keywordList}
                point={data?.data.descript[nowIdx].point}
              />
              <DescriptiveFormAnswer
                keywordNum={data?.data.descript[nowIdx].keywordNum}
                studentList={data?.data.descript[nowIdx].studentList}
                maxScore={data?.data.descript[nowIdx].point as number}
              />
            </>
          )}
        </>
      )}
    </DescriptiveFormWrapper>
  );
}
