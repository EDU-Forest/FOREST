import { Container, FullScreen } from "@/styles/container";
import GuideNav from "@/features/guide/GuideNav";
import { useState } from "react";

export default function UserGuide() {
  const [guideTab, setGuideTab] = useState<string>("intro");
  return (
    <FullScreen>
      <GuideNav guideTab={guideTab} setGuideTab={setGuideTab} />
      <Container padding={3}></Container>
    </FullScreen>
  );
}
