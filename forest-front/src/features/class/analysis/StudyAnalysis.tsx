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
import { StyledWorkbookStatus } from "@/components/Status/Status.style";
import QuestionCorrectRate from "./QuestionCorrectRate";
import EachResult from "./EachResult";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import DescriptiveForm from "./DescriptiveForm";
import useQuestionAnswerRateQuery from "@/apis/class/analysis/useQuestionAnswerRateQuery";
import AllCorrectRate from "./AllCorrectRate";
import useStudyResultQuery from "@/apis/class/teacher/useStudyResultQuery";

const examResult: TeacherExamResult = {
  studyId: 1,
  title: "킹규림의 수능 100제",
  startTime: "2023-04-27",
  endTime: "2023-04-28",
  userName: "킹규림",
  studyType: "SELF",
  scheduleType: "ONGOING",
  studyCreatedDate: "2023.04.27", // 출제일
  workbookCreatedDate: "2023.04.27", // 출판일
  volume: 10, // 문항 수
  isPublic: false,
  average: 80,
  standardDeviation: 8.5, //표준편차
  averageSolvingTime: 25,
  totalStudent: 20,
  participantStudent: 15,
  takeRate: 80,
};

export default function StudyAnalysis() {
  const { nowStudyId } = useSelector((state: RootState) => state.class);
  const router = useRouter();
  const goToBack = () => {
    router.back();
  };
  const [isSummary, setIsSummary] = useState<boolean>(true);

  const { data } = useStudyResultQuery(nowStudyId);
  console.log("데ㅇㄴ마인ㅁㅇ", data);

  // const { data } = useQuestionAnswerRateQuery(nowStudyId);

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
                <AllCorrectRate />
              </AnalysisUpperItem>
              <AnalysisUpperItem>
                <TotalResult
                  noMargin
                  average={data?.average}
                  standardDeviation={data?.standardDeviation}
                  averageSolvingTime={data?.averageSolvingTime}
                />
              </AnalysisUpperItem>
              <AnalysisUpperItem>
                <AnalysisSubTitle>응시율</AnalysisSubTitle>
                <TakeRateChart
                  noTitle
                  totalStudent={data?.totalStudent}
                  participantStudent={data?.participantStudent}
                  takeRate={data?.takeRate}
                />
                <div style={{ textAlign: "center" }}>
                  <StyledWorkbookStatus status="ONGOING">
                    {data?.participantStudent}명의 학생이 응시하였습니다
                  </StyledWorkbookStatus>
                </div>
              </AnalysisUpperItem>
              <AnalysisUpperItem>
                <ClassWorkbookInfo
                  noMargin
                  studyCreatedDate={data?.studyCreatedDate}
                  studyType={data?.studyType}
                  volume={data?.volume}
                  isPublic={data?.isPublic}
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
