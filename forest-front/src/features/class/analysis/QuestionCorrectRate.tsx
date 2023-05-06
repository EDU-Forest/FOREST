import { Bar } from "react-chartjs-2";
import {
  BarWrapper,
  CorrectRateLabelWrapper,
  CorrectRateWrapper,
} from "./QuestionCorrectRate.style";
import { AnalysisSubTitle, AnalysisText, LabelCircle } from "./StudyAnalysis.style";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const classAnswerRateList = [
  {
    problemNum: 1,
    correctRate: 80,
    incorrectRate: 20,
    ungradedRate: 0,
  },
  {
    problemNum: 2,
    correctRate: 70,
    incorrectRate: 30,
    ungradedRate: 0,
  },
  {
    problemNum: 3,
    correctRate: 0,
    incorrectRate: 0,
    ungradedRate: 100,
  },
  {
    problemNum: 4,
    correctRate: 40,
    incorrectRate: 60,
    ungradedRate: 0,
  },
  {
    problemNum: 5,
    correctRate: 90,
    incorrectRate: 10,
    ungradedRate: 0,
  },
  {
    problemNum: 6,
    correctRate: 100,
    incorrectRate: 0,
    ungradedRate: 0,
  },
  {
    problemNum: 7,
    correctRate: 0,
    incorrectRate: 100,
    ungradedRate: 0,
  },
  {
    problemNum: 8,
    correctRate: 80,
    incorrectRate: 20,
    ungradedRate: 0,
  },
  {
    problemNum: 9,
    correctRate: 0,
    incorrectRate: 0,
    ungradedRate: 100,
  },
  {
    problemNum: 10,
    correctRate: 50,
    incorrectRate: 50,
    ungradedRate: 0,
  },
];

export default function QuestionCorrectRate() {
  const { nowStudyId } = useSelector((state: RootState) => state.class);
  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    maxBarThickness: 32,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
          drawBorder: true,
        },
      },
      y: {
        stacked: true,
        display: true,
        grid: {
          display: true,
          drawBorder: true,
        },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          padding: 16,
        },
      },
    },

    plugins: {
      legend: {
        display: false,
      },
    },
  };
  const labels = classAnswerRateList.map((item) => `문항 ${item.problemNum}`);

  const data = {
    labels,
    datasets: [
      {
        label: "정답",
        data: classAnswerRateList.map((item) => item.correctRate),
        backgroundColor: "#94D82D",
      },
      {
        label: "오답",
        data: classAnswerRateList.map((item) => item.incorrectRate),
        backgroundColor: "#FF922B",
      },
      {
        label: "미채점",
        data: classAnswerRateList.map((item) => item.ungradedRate),
        backgroundColor: "#DEE2E6",
      },
    ],
  };

  return (
    <CorrectRateWrapper>
      <AnalysisSubTitle>문항별 정답률</AnalysisSubTitle>
      <CorrectRateLabelWrapper>
        <LabelCircle isCorrect />
        <AnalysisText isGray noMargin>
          정답
        </AnalysisText>
        <LabelCircle />
        <AnalysisText isGray noMargin>
          오답
        </AnalysisText>
        <LabelCircle notYet />
        <AnalysisText isGray noMargin>
          미채점
        </AnalysisText>
      </CorrectRateLabelWrapper>
      <BarWrapper>
        <Bar options={options} data={data} />
      </BarWrapper>
    </CorrectRateWrapper>
  );
}
