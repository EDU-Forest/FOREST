import { AiOutlineBars } from "react-icons/ai";
import { MdEqualizer } from "react-icons/md";
import {
  EachResultWrapper,
  ResultTableContent,
  ResultTableEmail,
  ResultTableItemBig,
  ResultTableItemSmall,
  ResultTableList,
  ResultTableName,
} from "./EachResult.style";
import { AnalysisSubTitle } from "./StudyAnalysis.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useStudentAnsweRate from "@/apis/class/analysis/useStudentAnsweRate";
import Loading from "@/components/Loading/Loading";
import arrangeDate from "@/utils/arrangeDate";
import StudentStudyResultList from "@/types/StudentStudyResultList";

interface Iprops {
  goToGrade: (item: StudentStudyResultList) => void;
}

export default function EachResult({ goToGrade }: Iprops) {
  const { nowStudyId } = useSelector((state: RootState) => state.class);

  const { data, isLoading } = useStudentAnsweRate(nowStudyId);

  const correctColor = (correctRate: number) => {
    if (correctRate < 50) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <EachResultWrapper>
      <AnalysisSubTitle>응시자별 성취도</AnalysisSubTitle>
      {isLoading ? (
        <Loading width={10} height={10} />
      ) : (
        <>
          <ResultTableList isLabel>
            <ResultTableItemBig isLabel>이름</ResultTableItemBig>
            <ResultTableItemBig isLabel>응시일시</ResultTableItemBig>
            <ResultTableItemBig isLabel>제출일시</ResultTableItemBig>
            <ResultTableItemSmall isLabel>정답수</ResultTableItemSmall>
            <ResultTableItemSmall isLabel>정답률</ResultTableItemSmall>
            <ResultTableItemSmall isLabel>상세 성적</ResultTableItemSmall>
          </ResultTableList>
          <ResultTableContent>
            {data?.map((item, idx) => (
              <ResultTableList key={idx}>
                <ResultTableItemBig>
                  <ResultTableName>
                    {item.name}
                    <ResultTableEmail>{item.email}</ResultTableEmail>
                  </ResultTableName>
                </ResultTableItemBig>
                <ResultTableItemBig>{arrangeDate(item.enterTime)}</ResultTableItemBig>
                <ResultTableItemBig>{arrangeDate(item.exitTime)}</ResultTableItemBig>
                <ResultTableItemSmall>{item.correctNum}</ResultTableItemSmall>
                <ResultTableItemSmall incorrect={correctColor(item.correctRate)}>
                  <span>{item.correctRate}</span>%
                </ResultTableItemSmall>
                <ResultTableItemSmall>
                  <MdEqualizer className="icon" onClick={() => goToGrade(item)} />
                </ResultTableItemSmall>
              </ResultTableList>
            ))}
          </ResultTableContent>
        </>
      )}
    </EachResultWrapper>
  );
}
