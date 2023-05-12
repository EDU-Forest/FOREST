import StudyAnalysis from "@/features/class/analysis/StudyAnalysis";
import { AnalysisFullScreen } from "@/features/class/analysis/StudyAnalysis.style";
import { setAnalysisId } from "@/stores/class/classInfo";
import { IStudyId } from "@/types/Study";
import withAuth from "@/utils/auth/withAuth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface ServerProps {
  query: {
    id: number;
  };
}

function StudyAnalysisPage({ studyId }: IStudyId) {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("분석페이지 마운트");
    return () => {
      console.log("분석페이지 언마운트");
      dispatch(setAnalysisId(studyId));
    };
  }, [studyId]);

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
