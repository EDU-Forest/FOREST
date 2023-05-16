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
  const [problemListId, setProblemListId] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [point, setPoint] = useState<number>(0);
  const [maxNum, setMaxNum] = useState<number>(0);
  const [isLast, setIsLast] = useState<boolean>(false);
  const { data: scoringData, mutate: scoringMutate } = useDescriptionScoring();
  const finishMutate = useExamFinish().mutate;
  const { data, isSuccess, isLoading } = useDescriptionQuery({ studyId: nowStudyId, setCount });

  useEffect(() => {
    if (isSuccess && data?.status === "STUDY_SUCCESS_RESULT_DESCRIPT_LIST") {
      setPoint(data?.descript[nowIdx].point);
      setProblemListId(data?.descript[nowIdx].problemListId);
      setMaxNum(data?.descript[nowIdx].studentList.length);
    }

    if (nowIdx === count - 1) {
      setIsLast(true);
    } else {
      setIsLast(false);
    }
  }, [isSuccess, nowIdx]);

  const handleClick = () => {
    const newStudentPointList = [];

    for (let i = 0; i < maxNum; i++) {
      newStudentPointList.push({ studentNum: i + 1, score: studentPointList[`score_${i}`] });
    }

    const payload = {
      problemListId,
      studyId: nowStudyId,
      point,
      isLast,
      studentPointList: newStudentPointList,
    };
    console.log("payload", payload);
    scoringMutate(payload);

    if (!isLast) {
      setNowIdx(nowIdx + 1);
    }
  };

  useEffect(() => {
    if (scoringData?.status === "STUDY_SAVE_DESCRIPT") {
      finishMutate(nowStudyId);
    }
  }, [scoringData]);

  return (
    <DescriptiveFormWrapper>
      {isLoading ? (
        <Loading width={10} height={10} />
      ) : (
        <>
          {data?.status === "STUDY_END" && (
            <NoDescription>
              <img src="/images/Banner_Teacher.png" />
              <span>채점이 완료되었습니다.</span>
            </NoDescription>
          )}
          {data?.status === "STUDY_NONE_RESULT_DESCRIPT_LIST" && (
            <NoDescription>
              <img src="/images/Banner_Teacher.png" />
              <span>서술형 문제가 없습니다.</span>
            </NoDescription>
          )}
          {data?.status === "STUDY_SUCCESS_RESULT_DESCRIPT_LIST" && (
            <>
              <DescriptiveFormBtn>
                <span>
                  {nowIdx + 1} / {count}
                </span>
                <SmallBtn children={nowIdx + 1 === count ? "완료" : "다음"} onClick={handleClick} />
              </DescriptiveFormBtn>

              <DescriptiveFormItem
                title={data?.descript[nowIdx].title}
                keywordList={data?.descript[nowIdx].keywordList}
                point={data?.descript[nowIdx].point}
              />
              <DescriptiveFormAnswer
                keywordNum={data?.descript[nowIdx].keywordNum}
                studentList={data?.descript[nowIdx].studentList}
                maxScore={data?.descript[nowIdx].point}
                nowIdx={nowIdx}
              />
            </>
          )}
        </>
      )}
    </DescriptiveFormWrapper>
  );
}
