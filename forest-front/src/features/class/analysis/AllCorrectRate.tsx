import { StyledWorkbookStatus } from "@/components/Status/Status.style";
import { PieChart } from "react-minimal-pie-chart";
import { SummaryChartWrapper } from "../ClassSummary.style";
import { AnalysisText, LabelCircle, AnalysisSubTitle } from "./StudyAnalysis.style";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import useAllAnswerRateQuery from "@/apis/class/analysis/useAllAnswerRateQuery";
import Loading from "@/components/Loading/Loading";

export default function AllCorrectRate() {
  const { nowStudyId } = useSelector((state: RootState) => state.class);

  // isLoading을 쓰고 한번 더 isSuccess 조건문을 줄ㄹ지...?
  const { data, isSuccess } = useAllAnswerRateQuery(nowStudyId);

  return (
    <>
      <AnalysisSubTitle>정답률</AnalysisSubTitle>
      {!isSuccess ? (
        <Loading width={5} height={5} />
      ) : (
        <>
          <SummaryChartWrapper>
            <PieChart
              data={[
                {
                  value: data.correctAnswerRate,
                  color: "#74B816",
                  name: "correct",
                },
                {
                  value: data.incorrectAnswerRate,
                  color: "#FFA94D",
                  name: "incorrect",
                },
                {
                  value: data.ungradedAnswerRate,
                  color: "#DEE2E6",
                  name: "ungraded",
                },
              ]}
              style={{ width: "152px" }}
              lineWidth={18}
              background="white"
              lengthAngle={360}
              startAngle={270}
              animate
              label={({ dataEntry }) => `${data.correctAnswerRate}%`}
              labelStyle={{
                fontSize: "1rem",
                fontWeight: 700,
                fill: "#82C91E",
              }}
              labelPosition={0}
            />

            <div>
              <LabelCircle isCorrect />
              <AnalysisText isGray> 정답</AnalysisText>
              <LabelCircle />
              <AnalysisText isGray> 오답</AnalysisText>
              <LabelCircle notYet />
              <AnalysisText isGray noMargin>
                미채점
              </AnalysisText>
            </div>
          </SummaryChartWrapper>

          <div style={{ textAlign: "center" }}>
            <StyledWorkbookStatus status="BEFORE">
              학생들이 평균적으로 {data.correctAnswerRate}%의 문제를 맞췄습니다
            </StyledWorkbookStatus>
          </div>
        </>
      )}
    </>
  );
}
