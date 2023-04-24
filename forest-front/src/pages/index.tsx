import EmailBox from "@/features/home/EmailBox";
import { FullScreen } from "@/styles/container";
import { ForestLargeLogo } from "./index.style";
import KakaoLogin from "@/features/home/KakaoLogin";

export default function Home() {
  return (
    <FullScreen isColumn={true}>
      <ForestLargeLogo src={"/images/Forest_Logo.png"} />
      <KakaoLogin />
      <EmailBox />
    </FullScreen>
  );
}
