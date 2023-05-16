import { Container, FullScreen } from "@/styles/container";
import GuideNav from "@/features/guide/GuideNav";
import { useState } from "react";
import GuideIntroduction from "@/features/guide/GuideIntroduction";
import { GuideContentWrapper } from "@/features/guide/Guide.style";
import { GuideTitle } from "@/features/guide/GuideText.style";
import GuideRole from "@/features/guide/GuideRole";
import GuideDashboard from "@/features/guide/GuideDashboard";
import GuideClass from "@/features/guide/GuideClass";
import GuideProblem from "@/features/guide/GuideProblem";
import GuideEditor from "@/features/guide/GuideEditor";
import GuideSearch from "@/features/guide/GuideSearch";

export default function UserGuide() {
  const [guideTab, setGuideTab] = useState<string>("intro");
  return (
    <FullScreen>
      <GuideNav guideTab={guideTab} setGuideTab={setGuideTab} />
      <GuideContentWrapper>
        <GuideTitle>FOREST 사용 가이드</GuideTitle>
        {guideTab === "intro" && <GuideIntroduction />}
        {guideTab === "role" && <GuideRole />}
        {guideTab === "dashboard" && <GuideDashboard />}
        {guideTab === "class" && <GuideClass />}
        {guideTab === "problem" && <GuideProblem />}
        {guideTab === "editor" && <GuideEditor />}
        {guideTab === "search" && <GuideSearch />}
      </GuideContentWrapper>
    </FullScreen>
  );
}
