import StudyAnalysis from "@/features/class/analysis/StudyAnalysis";
import { AnalysisFullScreen } from "@/features/class/analysis/StudyAnalysis.style";
import { IStudyId } from "@/types/Study";
import withAuth from "@/utils/auth/withAuth";

interface ServerProps {
  query: {
    id: number;
  };
}

function StudyAnalysisPage({ studyId }: IStudyId) {
  return (
    <AnalysisFullScreen>
      <StudyAnalysis />
    </AnalysisFullScreen>
  );
}

export default withAuth(StudyAnalysisPage);

export const getServerSideProps = async ({ query: { id } }: ServerProps) => {
  const studyId = id;
  return {
    props: {
      studyId,
    },
  };
};
