import StudyAnalysis from "@/features/class/analysis/StudyAnalysis";
import { AnalysisFullScreen } from "@/features/class/analysis/StudyAnalysis.style";

interface ServerProps {
  query: {
    id: number;
  };
}

interface Iprops {
  studyId: number;
}

export default function StudyAnalysisPage({ studyId }: Iprops) {
  return (
    <AnalysisFullScreen>
      <StudyAnalysis studyId={studyId} />
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
