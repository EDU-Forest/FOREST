import ArrowLeft from "@/components/Arrow/ArrowLeft";
import { AnalysisTitle, AnalysisContent } from "@/features/class/analysis/StudyAnalysis.style";
import { useRouter } from "next/router";
import { useState } from "react";
import AnalysisToggle from "./AnalysisToggle";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import DescriptiveForm from "./DescriptiveForm";
import StudyAnalysisSummary from "./StudyAnalysisSummary";

export default function StudyAnalysis() {
  const { studyTitle, isDescript } = useSelector((state: RootState) => state.class);
  const router = useRouter();

  const goToBack = () => {
    router.push("/teacher/class");
  };
  const [isSummary, setIsSummary] = useState<boolean>(true);

  return (
    <>
      <AnalysisTitle>
        <ArrowLeft onClick={goToBack} />
        <p style={{ marginLeft: "2rem" }}>{studyTitle}</p>
      </AnalysisTitle>
      <AnalysisContent>
        <AnalysisToggle isSummary={isSummary} setToggle={setIsSummary} isDescript={isDescript} />
        {isSummary ? <StudyAnalysisSummary /> : <DescriptiveForm />}
      </AnalysisContent>
    </>
  );
}
