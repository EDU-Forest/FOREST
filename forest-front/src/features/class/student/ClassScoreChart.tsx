import { PieChart } from "react-minimal-pie-chart";
import {
  ClassSummarySubTitle,
  StudentScoreChartLabel,
  SummaryChartWrapper,
} from "../ClassSummary.style";

interface Iprops {
  myScore: number;
  totalScore: number;
}

export default function ClassScoreChart({ myScore, totalScore }: Iprops) {
  const percent = (myScore / totalScore) * 100;
  return (
    <SummaryChartWrapper isStudent>
      <ClassSummarySubTitle>내 점수</ClassSummarySubTitle>
      <PieChart
        data={[
          {
            value: percent,
            color: "#74B816",
            name: "chart",
          },
        ]}
        style={{ width: "152px" }}
        reveal={percent}
        lineWidth={20}
        background="#f3f3f3"
        lengthAngle={360}
        startAngle={270}
        rounded
        animate
      />
      <StudentScoreChartLabel>
        <div>
          <p>{myScore}</p>
          <p> / {totalScore}</p>
        </div>
        <span>(점)</span>
      </StudentScoreChartLabel>
    </SummaryChartWrapper>
  );
}
