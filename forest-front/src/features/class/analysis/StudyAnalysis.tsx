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
import AllCorrectRate from "./AllCorrectRate";
import useStudyResultQuery from "@/apis/class/teacher/useStudyResultQuery";
import Loading from "@/components/Loading/Loading";

export default function StudyAnalysis() {
  const { nowStudyId } = useSelector((state: RootState) => state.class);
  const router = useRouter();
  const goToBack = () => {
    router.back();
  };
  const [isSummary, setIsSummary] = useState<boolean>(true);

  const { data, isLoading } = useStudyResultQuery(nowStudyId);

  return (
    <>
      <AnalysisTitle>
        <ArrowLeft onClick={goToBack} />
        <p style={{ marginLeft: "2rem" }}>{data?.title}</p>
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
                {isLoading ? (
                  <Loading width={5} height={5} />
                ) : (
                  <TotalResult
                    noMargin
                    average={data?.average}
                    standardDeviation={data?.standardDeviation}
                    averageSolvingTime={data?.averageSolvingTime}
                  />
                )}
              </AnalysisUpperItem>
              <AnalysisUpperItem>
                {isLoading ? (
                  <Loading width={5} height={5} />
                ) : (
                  <>
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
                  </>
                )}
              </AnalysisUpperItem>
              <AnalysisUpperItem>
                {isLoading ? (
                  <Loading width={5} height={5} />
                ) : (
                  <ClassWorkbookInfo
                    noMargin
                    studyCreatedDate={data?.studyCreatedDate}
                    studyType={data?.studyType}
                    volume={data?.volume}
                    isPublic={data?.isPublic}
                  />
                )}
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
