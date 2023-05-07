import { PieChart } from "react-minimal-pie-chart";
import { ClassLabelBox, StudentScoreChartLabel, SummaryChartWrapper } from "../ClassSummary.style";
import { AnalysisText, LabelCircle } from "./StudyAnalysis.style";

interface Iprops {
  answerRate: AnswerRate;
  page?: string;
}

export default function CorrectRateDonut({ answerRate, page }: Iprops) {
  return (
    <SummaryChartWrapper>
      <PieChart
        data={[
          {
            value: answerRate.correctAnswerRate,
            color: "#74B816",
            name: "correct",
          },
          {
            value: answerRate.incorrectAnswerRate,
            color: "#FFA94D",
            name: "incorrect",
          },
          {
            value: answerRate.ungradedAnswerRate,
            color: "#DEE2E6",
            name: "ungraded",
          },
        ]}
        style={{ width: "152px" }}
        lineWidth={18}
        background="#ffffff"
        lengthAngle={360}
        startAngle={270}
        animate
        label={({ dataEntry }) => `${answerRate.correctAnswerRate}%`}
        labelStyle={{
          fontSize: "1rem",
          fontWeight: 700,
          fill: "#82C91E",
        }}
        labelPosition={0}
      />

      <ClassLabelBox page={page ? page : ""}>
        <LabelCircle page={page ? page : ""} isCorrect />
        <AnalysisText isGray> 정답</AnalysisText>
        <LabelCircle page={page ? page : ""} />
        <AnalysisText isGray> 오답</AnalysisText>
        <LabelCircle page={page ? page : ""} notYet />
        <AnalysisText isGray noMargin>
          미채점
        </AnalysisText>
      </ClassLabelBox>
    </SummaryChartWrapper>
  );
}
