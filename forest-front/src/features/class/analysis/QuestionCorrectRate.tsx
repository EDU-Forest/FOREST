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
import useQuestionAnswerRateQuery from "@/apis/class/analysis/useQuestionAnswerRateQuery";
import Loading from "@/components/Loading/Loading";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function QuestionCorrectRate() {
  const { nowStudyId } = useSelector((state: RootState) => state.class);

  const { data, isLoading } = useQuestionAnswerRateQuery(nowStudyId);

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

  const labels = data && data?.map((item) => `문항 ${item.problemNum}`);

  const barData = {
    labels,
    datasets: [
      {
        label: "정답",
        data: data && data?.map((item) => item.correctRate),
        backgroundColor: "#94D82D",
      },
      {
        label: "오답",
        data: data && data?.map((item) => item.incorrectRate),
        backgroundColor: "#FF922B",
      },
      {
        label: "미채점",
        data: data && data?.map((item) => item.ungradedRate),
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
        {isLoading ? <Loading width={10} height={10} /> : <Bar options={options} data={barData} />}
      </BarWrapper>
    </CorrectRateWrapper>
  );
}
