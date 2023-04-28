import { PieChart } from "react-minimal-pie-chart";
import { SummaryChartWrapper } from "../ClassSummary.style";
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
            name: "chart",
          },
        ]}
        style={{ width: "152px" }}
        reveal={answerRate.correctAnswerRate}
        lineWidth={18}
        background="#FFA94D"
        lengthAngle={360}
        startAngle={270}
        // rounded
        animate
        label={({ dataEntry }) => dataEntry.value + "%"}
        labelStyle={{
          fontSize: "14px",
          fill: "#82C91E",
        }}
        labelPosition={0}
      />
      <div>
        <LabelCircle isCorrect />
        <AnalysisText isGray> 정답</AnalysisText>
        <LabelCircle />
        <AnalysisText isGray> 오답</AnalysisText>
      </div>
    </SummaryChartWrapper>
  );
}
