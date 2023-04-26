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
import ClassSummaryResult from "../ClassSummaryResult";
import ClassSummaryWorkbook from "../teacher/ClassSummaryWorkbook";
import TakeRateChart from "../TakeRateChart";
import CorrectRateDonut from "./CorrectRateDonut";
import { StyledWorkbookStatus } from "@/components/Status/Status.style";

interface Iprops {
  studyId: number;
}

const dummyData = {
  studyId: 1,
  title: "킹규림쌤의 수능특강 완성편",
  startTime: "",
  userName: "킹규림",
  studyType: "self",
  scheduleType: "self",
  studyCreatedDate: "2022-08-08",
  workbookCreatedDate: "2022-08-08",
  volume: 20,
  isPublic: true,
  average: 88.5,
  standardDeviation: 8.5,
  averageSolvingTime: "23:23",
  totalStudent: 20,
  participantStudent: 16,
  takeRate: 80,
};

const dummyCorrectRate = {
  correctAnswerRate: 80,
};
export default function StudyAnalysis({ studyId }: Iprops) {
  const router = useRouter();
  const goToBack = () => {
    router.back();
  };
  const [isSummary, setIsSummary] = useState<boolean>(true);

  return (
    <>
      <AnalysisTitle>
        <ArrowLeft onClick={goToBack} />
        <p style={{ marginLeft: "2rem" }}>{dummyData.title}</p>
      </AnalysisTitle>
      <AnalysisContent>
        <AnalysisToggle isSummary={isSummary} setToggle={setIsSummary} />
        <AnalysisUpper>
          <AnalysisUpperItem>
            <AnalysisSubTitle>정답률</AnalysisSubTitle>
            <CorrectRateDonut correctAnswerRate={dummyCorrectRate.correctAnswerRate} />
            <div style={{ textAlign: "center" }}>
              <StyledWorkbookStatus status="loading">
                학생들이 평균적으로 {dummyData.average}%의 문제를 맞췄습니다
              </StyledWorkbookStatus>
            </div>
          </AnalysisUpperItem>
          <AnalysisUpperItem>
            <ClassSummaryResult noMargin />
          </AnalysisUpperItem>
          <AnalysisUpperItem>
            <AnalysisSubTitle>응시율</AnalysisSubTitle>
            <TakeRateChart
              noTitle
              totalStudent={dummyData.totalStudent}
              participantStudent={dummyData.participantStudent}
              takeRate={dummyData.takeRate}
            />
            <div style={{ textAlign: "center" }}>
              <StyledWorkbookStatus status="progress">
                {dummyData.participantStudent}명의 학생이 응시하였습니다
              </StyledWorkbookStatus>
            </div>
          </AnalysisUpperItem>
          <AnalysisUpperItem>
            <ClassSummaryWorkbook noMargin />
          </AnalysisUpperItem>
        </AnalysisUpper>
      </AnalysisContent>
    </>
  );
}
