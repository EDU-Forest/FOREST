import { PieChart } from "react-minimal-pie-chart";
import { StudentScoreChartLabel, SummaryChartWrapper } from "../ClassSummary.style";
import { AnalysisText, LabelCircle } from "./StudyAnalysis.style";

interface Iprops {
  answerRate: AnswerRate;
}

export default function CorrectRateDonut({ answerRate }: Iprops) {
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
        background="white"
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
  );
}
