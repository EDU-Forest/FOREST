import { PieChart } from "react-minimal-pie-chart";
import { ClassSummarySubTitle, ClassSummaryText, SummaryChartWrapper } from "./ClassSummary.style";

interface Iprops {
  noTitle?: boolean;
  totalStudent: number;
  participantStudent: number;
  takeRate: number;
}

// 응시율 - 클래스(T), 분석
export default function TakeRateChart({
  noTitle,
  totalStudent,
  participantStudent,
  takeRate,
}: Iprops) {
  return (
    <SummaryChartWrapper className="class-summary-items">
      {!noTitle && <ClassSummarySubTitle>응시율</ClassSummarySubTitle>}
      <PieChart
        data={[
          {
            value: takeRate,
            color: "#74B816",
            name: "chart",
          },
        ]}
        style={{ width: "152px" }}
        reveal={takeRate}
        lineWidth={18}
        background="#f3f3f3"
        lengthAngle={360}
        startAngle={270}
        rounded
        animate
        label={({ dataEntry }) => dataEntry.value + "%"}
        labelStyle={{
          fontSize: "1rem",
          fontWeight: 700,
          fill: "#82C91E",
        }}
        labelPosition={0}
      />
      <div>
        <ClassSummaryText isGreen>{participantStudent} </ClassSummaryText>
        <ClassSummaryText isGray> / {totalStudent} 명</ClassSummaryText>
      </div>
    </SummaryChartWrapper>
  );
}
