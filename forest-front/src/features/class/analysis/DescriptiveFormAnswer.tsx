import ScoreInput from "@/components/Input/ScoreInput";
import { TableItemAnswer } from "./DescriptiveForm.style";
import {
  EachResultWrapper,
  ResultTable,
  ResultTableItemBig,
  ResultTableItemSmall,
  ResultTableList,
} from "./EachResult.style";
import { CorrectRateWrapper } from "./QuestionCorrectRate.style";
import { AnalysisSubTitle } from "./StudyAnalysis.style";
import { ChangeEvent, useEffect, useState } from "react";

const dummy = [
  {
    answer:
      "학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안",
    similarity: 80,
    allKeyword: 5,
    keyword: 3,
  },
  {
    answer: "도언아 안녕 도언아 안녕 ",
    similarity: 80,
    allKeyword: 5,
    keyword: 3,
  },
  {
    answer:
      "학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안",
    similarity: 80,
    allKeyword: 5,
    keyword: 3,
  },
  {
    answer:
      "학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안",
    similarity: 80,
    allKeyword: 5,
    keyword: 3,
  },
  {
    answer:
      "학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안",
    similarity: 80,
    allKeyword: 5,
    keyword: 3,
  },
  {
    answer:
      "학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안 학생의 답안",
    similarity: 80,
    allKeyword: 5,
    keyword: 3,
  },
];

interface ObjType {
  [index: string]: number;
}

export default function DescriptiveFormAnswer() {
  const [scoreList, setScoreList] = useState<ObjType>({});

  useEffect(() => {
    dummy.map((item, idx) => (scoreList[`score_${idx}`] = 0));
  }, []);

  const changeScore = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const { value } = e.target;
    const numberScore = parseInt(value.replace(/[^0-9]/g, ""));

    setScoreList({
      ...scoreList,
      [`score_${idx}`]: numberScore,
    });
  };

  return (
    <EachResultWrapper>
      <ResultTable>
        <ResultTableList isLabel>
          <ResultTableItemSmall isLabel>순번</ResultTableItemSmall>
          <TableItemAnswer isLabel>답안</TableItemAnswer>
          <ResultTableItemSmall isLabel>유사도</ResultTableItemSmall>
          <ResultTableItemSmall isLabel>핵심 키워드</ResultTableItemSmall>
          <ResultTableItemSmall isLabel>점수</ResultTableItemSmall>
        </ResultTableList>
        {dummy.map((item, idx) => (
          <ResultTableList key={idx}>
            <ResultTableItemSmall>{idx + 1}</ResultTableItemSmall>
            <TableItemAnswer>{item.answer}</TableItemAnswer>
            <ResultTableItemSmall>{item.similarity}</ResultTableItemSmall>
            <ResultTableItemSmall>
              {item.keyword} / {item.allKeyword}
            </ResultTableItemSmall>
            <ResultTableItemSmall>
              <ScoreInput
                id={"score"}
                name={`score_${idx}`}
                maxScore={100}
                inputScore={scoreList.name}
                onChange={(e) => changeScore(e, idx)}
              />
            </ResultTableItemSmall>
          </ResultTableList>
        ))}
      </ResultTable>
    </EachResultWrapper>
  );
}
