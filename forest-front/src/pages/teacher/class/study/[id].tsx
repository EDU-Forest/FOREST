import StudyAnalysis from "@/features/class/analysis/StudyAnalysis";
import { AnalysisFullScreen } from "@/features/class/analysis/StudyAnalysis.style";
import { setStudyId } from "@/stores/analysis/analysis";
import { useDispatch } from "react-redux";

interface ServerProps {
  query: {
    id: number;
  };
}

export default function StudyAnalysisPage({ studyId }: StudyId) {
  const dispatch = useDispatch();
  dispatch(setStudyId(studyId));
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
