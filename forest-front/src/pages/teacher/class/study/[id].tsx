import StudyAnalysis from "@/features/class/analysis/StudyAnalysis";
import { AnalysisFullScreen } from "@/features/class/analysis/StudyAnalysis.style";

interface ServerProps {
  query: {
    id: number;
  };
}

export default function StudyAnalysisPage({ studyId }: StudyId) {
  return (
    <AnalysisFullScreen>
      <StudyAnalysis />
    </AnalysisFullScreen>
  );
}

export const getServerSideProps = async ({ query: { id } }: ServerProps) => {
  const studyId = id;
  return {
    props: {
      studyId,
    },
  };
};
