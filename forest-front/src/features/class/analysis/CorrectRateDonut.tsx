import { PieChart } from "react-minimal-pie-chart";
import { ClassSummaryText, SummaryChartWrapper } from "../ClassSummary.style";
import { LabelCircle } from "./StudyAnalysis.style";

interface Iprops {
  correctAnswerRate: number;
}

export default function CorrectRateDonut({ correctAnswerRate }: Iprops) {
  return (
    <SummaryChartWrapper>
      <PieChart
        data={[
          {
            value: correctAnswerRate,
            color: "#74B816",
            name: "chart",
          },
        ]}
        style={{ width: "152px" }}
        reveal={correctAnswerRate}
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
        <ClassSummaryText isGray> 정답</ClassSummaryText>
        <LabelCircle />
        <ClassSummaryText isGray> 오답</ClassSummaryText>
      </div>
    </SummaryChartWrapper>
  );
}
