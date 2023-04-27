import { AiOutlineBars } from "react-icons/ai";
import { MdEqualizer } from "react-icons/md";
import {
  EachResultWrapper,
  ResultTable,
  ResultTableEmail,
  ResultTableItemBig,
  ResultTableItemSmall,
  ResultTableList,
  ResultTableName,
} from "./EachResult.style";
import { AnalysisSubTitle } from "./StudyAnalysis.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

const studentStudyResultList = [
  {
    name: "김이름",
    email: "abc111@gmail.com",
    enterTime: "2023.04.19 11:32",
    exitTime: "2023.04.19 13:22",
    correctNum: 15,
    correctRate: 87,
  },
  {
    name: "김이름",
    email: "abc111@gmail.com",
    enterTime: "2023.04.19 11:32",
    exitTime: "2023.04.19 13:22",
    correctNum: 15,
    correctRate: 87,
  },
  {
    name: "김이름",
    email: "abc111@gmail.com",
    enterTime: "2023.04.19 11:32",
    exitTime: "2023.04.19 13:22",
    correctNum: 15,
    correctRate: 87,
  },
  {
    name: "김이름",
    email: "abc111@gmail.com",
    enterTime: "2023.04.19 11:32",
    exitTime: "2023.04.19 13:22",
    correctNum: 15,
    correctRate: 87,
  },
  {
    name: "김이름",
    email: "abc111@gmail.com",
    enterTime: "2023.04.19 11:32",
    exitTime: "2023.04.19 13:22",
    correctNum: 15,
    correctRate: 87,
  },
];

export default function EachResult() {
  const { studyId } = useSelector((state: RootState) => state.analysis);
  const goToAnswer = () => {
    // 개인 답안으로 이동
  };
  const goToGrade = () => {
    // 상세 성적으로 이동
  };
  return (
    <EachResultWrapper>
      <AnalysisSubTitle>응시자별 성취도</AnalysisSubTitle>
      <ResultTable>
        <ResultTableList isLabel>
          <ResultTableItemBig isLabel>이름</ResultTableItemBig>
          <ResultTableItemBig isLabel>응시일시</ResultTableItemBig>
          <ResultTableItemBig isLabel>제출일시</ResultTableItemBig>
          <ResultTableItemSmall isLabel>정답수</ResultTableItemSmall>
          <ResultTableItemSmall isLabel>정답률</ResultTableItemSmall>
          <ResultTableItemSmall isLabel>답안</ResultTableItemSmall>
          <ResultTableItemSmall isLabel>상세 성적</ResultTableItemSmall>
        </ResultTableList>
        {studentStudyResultList.map((item, idx) => (
          <ResultTableList key={idx}>
            <ResultTableItemBig>
              <ResultTableName>
                {item.name}
                <ResultTableEmail>{item.email}</ResultTableEmail>
              </ResultTableName>
            </ResultTableItemBig>
            <ResultTableItemBig>{item.enterTime}</ResultTableItemBig>
            <ResultTableItemBig>{item.exitTime}</ResultTableItemBig>
            <ResultTableItemSmall>{item.correctNum}</ResultTableItemSmall>
            <ResultTableItemSmall>{item.correctRate}</ResultTableItemSmall>
            <ResultTableItemSmall>
              <AiOutlineBars className="icon" onClick={goToAnswer} />
            </ResultTableItemSmall>
            <ResultTableItemSmall>
              <MdEqualizer className="icon" onClick={goToGrade} />
            </ResultTableItemSmall>
          </ResultTableList>
        ))}
      </ResultTable>
    </EachResultWrapper>
  );
}
