import { Container, FullScreen } from "@/styles/container";
import { GuideWrapper } from "../../features/guide/Guide.style";
import GuideNav from "@/features/guide/GuideNav";

export default function UserGuide() {
  return (
    <FullScreen>
      <GuideNav />
      <Container padding={3}></Container>
    </FullScreen>
  );
}
