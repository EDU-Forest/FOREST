import ScoreInput from "@/components/Input/ScoreInput";
import { TableItemAnswer } from "./DescriptiveForm.style";
import {
  EachResultWrapper,
  ResultTableContent,
  ResultTableItemSmall,
  ResultTableList,
} from "./EachResult.style";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { useDispatch } from "react-redux";
import { setStudentPointList } from "@/stores/class/classInfo";
import { IStudentList } from "@/types/Descript";
import { CommonInput } from "@/components/Input/Input.style";

interface ObjType {
  [index: string]: number;
}

interface Iprops {
  studentList?: IStudentList[];
  keywordNum?: number;
  maxScore: number;
  nowIdx: number;
}

export default function DescriptiveFormAnswer({
  studentList,
  keywordNum,
  maxScore,
  nowIdx,
}: Iprops) {
  const [scoreList, setScoreList] = useState<ObjType>({});
  const dispatch = useDispatch();

  useEffect(() => {
    studentList?.map((item, idx) => (scoreList[`score_${idx}`] = 0));
  }, [nowIdx]);

  const changeScore = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const { value } = e.target;
    let numberScore = parseInt(value.replace(/[^0-9]/g, ""));

    if (numberScore > maxScore) {
      numberScore = maxScore;
    }

    setScoreList({
      ...scoreList,
      [`score_${idx}`]: isNaN(numberScore) ? 0 : numberScore,
    });
    dispatch(
      setStudentPointList({
        ...scoreList,
        [`score_${idx}`]: isNaN(numberScore) ? 0 : numberScore,
      }),
    );
  };

  return (
    <EachResultWrapper height={37.5}>
      <>
        <ResultTableList isLabel>
          <ResultTableItemSmall isLabel isIdx>
            순번
          </ResultTableItemSmall>
          <TableItemAnswer isLabel>답안</TableItemAnswer>
          <ResultTableItemSmall isLabel>유사도</ResultTableItemSmall>
          <ResultTableItemSmall isLabel>핵심 키워드</ResultTableItemSmall>
          <ResultTableItemSmall isLabel>점수</ResultTableItemSmall>
        </ResultTableList>
        <ResultTableContent>
          {studentList?.map((item, idx) => (
            <ResultTableList key={idx}>
              <ResultTableItemSmall isIdx>{idx + 1}</ResultTableItemSmall>
              <TableItemAnswer>{item.answer}</TableItemAnswer>
              <ResultTableItemSmall isOrange>
                <span>{item.similarity}</span> %
              </ResultTableItemSmall>
              <ResultTableItemSmall>
                <span>{item.sameNum}</span>/ {keywordNum}
              </ResultTableItemSmall>
              <ResultTableItemSmall>
                <ScoreInput
                  id={`score_${idx}`}
                  name={`score_${idx}`}
                  maxInput={maxScore}
                  inputScore={scoreList[`score_${idx}`] | 0}
                  onChange={(e) => changeScore(e, idx)}
                />
              </ResultTableItemSmall>
            </ResultTableList>
          ))}
        </ResultTableContent>
      </>
    </EachResultWrapper>
  );
}
