import ArrowLeft from "@/components/Arrow/ArrowLeft";
import { StudyAnalysisTitle } from "@/features/class/analysis/StudyAnalysis.style";
import { FullScreen } from "@/styles/container";
import { useRouter } from "next/router";

interface ServerProps {
  query: {
    id: number;
  };
}

interface Iprops {
  studyId: number;
}

export default function StudyAnalysisStudent({ studyId }: Iprops) {
  const router = useRouter();
  const goToBack = () => {
    router.back();
  };

  return (
    <FullScreen>
      <StudyAnalysisTitle>
        <ArrowLeft onClick={goToBack} />
        {studyId}
      </StudyAnalysisTitle>
    </FullScreen>
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
