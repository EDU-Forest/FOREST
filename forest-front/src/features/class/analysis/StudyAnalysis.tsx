import ArrowLeft from "@/components/Arrow/ArrowLeft";
import { AnalysisTitle, AnalysisContent } from "@/features/class/analysis/StudyAnalysis.style";
import { useRouter } from "next/router";
import { useState } from "react";
import AnalysisToggle from "./AnalysisToggle";
import { useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import DescriptiveForm from "./DescriptiveForm";
import StudyAnalysisSummary from "./StudyAnalysisSummary";
import Toast from "@/components/Toast/Toast";
import { IoIosWarning } from "react-icons/io";

export default function StudyAnalysis() {
  const { studyTitle, isDescript } = useSelector((state: RootState) => state.class);
  const router = useRouter();
  const [notCompleted, setNotCompleted] = useState<boolean>(false);

  const goToBack = () => {
    if (isDescript) {
      setNotCompleted(true);
      return;
    }
    router.push("/teacher/class", undefined, { shallow: true });
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
      {notCompleted && (
        <Toast
          icon={<IoIosWarning />}
          subtitle="채점 미완료"
          title="서술형 채점을 완료해주세요"
          isOpen={notCompleted}
          setIsOpen={setNotCompleted}
        />
      )}
    </>
  );
}
