import { PieChart } from "react-minimal-pie-chart";
import { ClassSummarySubTitle, SummaryChartWrapper } from "../ClassSummary.style";

interface Iprops {
  score: number;
}

export default function ClassSummaryScoreChart({ score }: Iprops) {
  return (
    <SummaryChartWrapper isStudent>
      <ClassSummarySubTitle>내 점수</ClassSummarySubTitle>
      <PieChart
        data={[
          {
            value: score,
            color: "#74B816",
            name: "chart",
          },
        ]}
        style={{ width: "152px" }}
        reveal={score}
        lineWidth={20}
        background="#f3f3f3"
        lengthAngle={360}
        rounded
        animate
        label={({ dataEntry }) => dataEntry.value + "점"}
        labelStyle={{
          fontSize: "14px",
          fill: "#82C91E",
        }}
        labelPosition={0}
      />
    </SummaryChartWrapper>
  );
}
