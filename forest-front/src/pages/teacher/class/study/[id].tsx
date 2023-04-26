import ArrowLeft from "@/components/Arrow/ArrowLeft";
import {
  AnalysisFullScreen,
  StudyAnalysisTitle,
} from "@/features/class/analysis/StudyAnalysis.style";
import { useRouter } from "next/router";

interface ServerProps {
  query: {
    id: number;
  };
}

interface Iprops {
  studyId: number;
}

export default function StudyAnalysis({ studyId }: Iprops) {
  const router = useRouter();
  const goToBack = () => {
    router.back();
  };

  return (
    <AnalysisFullScreen>
      <StudyAnalysisTitle>
        <ArrowLeft onClick={goToBack} />
        {studyId}
      </StudyAnalysisTitle>
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
