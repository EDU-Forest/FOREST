import ArrowLeft from "@/components/Arrow/ArrowLeft";

import {
  AnalysisTitle,
  AnalysisContent,
  AnalysisUpper,
  AnalysisUpperItem,
  AnalysisSubTitle,
} from "@/features/class/analysis/StudyAnalysis.style";
import { useRouter } from "next/router";

import { useState } from "react";
import AnalysisToggle from "./AnalysisToggle";
import TotalResult from "../TotalResult";
import ClassWorkbookInfo from "../ClassWorkbookInfo";
import TakeRateChart from "../TakeRateChart";
import CorrectRateDonut from "./CorrectRateDonut";
import { StyledWorkbookStatus } from "@/components/Status/Status.style";
import QuestionCorrectRate from "./QuestionCorrectRate";
import EachResult from "./EachResult";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import DescriptiveForm from "./DescriptiveForm";

const examResult: TeacherExamResult = {
  studyId: 1,
  title: "킹규림의 수능 100제",
  startTime: "2023-04-27",
  endTime: "2023-04-28",
  userName: "킹규림",
  studyType: "SELF",
  scheduleType: "ONGOING",
  studyCreatedDate: "2023-04-27", // 출제일
  workbookCreatedDate: "2023-04-27", // 출판일
  volume: 10, // 문항 수
  isPublic: false,
  average: 80,
  standardDeviation: 8.5, //표준편차
  averageSolvingTime: 25,
  totalStudent: 20,
  participantStudent: 15,
  takeRate: 80,
};

const answerRate: AnswerRate = {
  correctAnswerRate: 70,
  incorrectAnswerRate: 20,
  ungradedAnswerRate: 10,
};

export default function StudyAnalysis() {
  const { studyId } = useSelector((state: RootState) => state.analysis);
  const router = useRouter();
  const goToBack = () => {
    router.back();
  };
  const [isSummary, setIsSummary] = useState<boolean>(true);

  return (
    <>
      <AnalysisTitle>
        <ArrowLeft onClick={goToBack} />
        <p style={{ marginLeft: "2rem" }}>{examResult.title}</p>
      </AnalysisTitle>
      <AnalysisContent>
        <AnalysisToggle isSummary={isSummary} setToggle={setIsSummary} />

        {isSummary ? (
          <>
            <AnalysisUpper>
              <AnalysisUpperItem>
                <AnalysisSubTitle>정답률</AnalysisSubTitle>
                <CorrectRateDonut answerRate={answerRate} />
                <div style={{ textAlign: "center" }}>
                  <StyledWorkbookStatus status="loading">
                    학생들이 평균적으로 {answerRate.correctAnswerRate}%의 문제를 맞췄습니다
                  </StyledWorkbookStatus>
                </div>
              </AnalysisUpperItem>
              <AnalysisUpperItem>
                <TotalResult
                  noMargin
                  average={examResult.average}
                  standardDeviation={examResult.standardDeviation}
                  averageSolvingTime={examResult.averageSolvingTime}
                />
              </AnalysisUpperItem>
              <AnalysisUpperItem>
                <AnalysisSubTitle>응시율</AnalysisSubTitle>
                <TakeRateChart
                  noTitle
                  totalStudent={examResult.totalStudent}
                  participantStudent={examResult.participantStudent}
                  takeRate={examResult.takeRate}
                />
                <div style={{ textAlign: "center" }}>
                  <StyledWorkbookStatus status="progress">
                    {examResult.participantStudent}명의 학생이 응시하였습니다
                  </StyledWorkbookStatus>
                </div>
              </AnalysisUpperItem>
              <AnalysisUpperItem>
                <ClassWorkbookInfo
                  noMargin
                  studyCreatedDate={examResult.studyCreatedDate}
                  studyType={examResult.studyType}
                  volume={examResult.volume}
                  isPublic={examResult.isPublic}
                />
              </AnalysisUpperItem>
            </AnalysisUpper>
            {/* 문항별 정답률 */}
            <QuestionCorrectRate />
            {/* 응시자별 성취도 */}
            <EachResult />
          </>
        ) : (
          <DescriptiveForm />
        )}
      </AnalysisContent>
    </>
  );
}
