import { FullScreen } from "@/styles/container";
import { ForestLargeLogo, AuthSection } from "../features/home/index.style";
import KakaoLogin from "@/features/home/KakaoLogin";
import { useRouter } from "next/router";
import EmailAuth from "@/features/home/EmailAuth";
import avoidDuplicateLoginAuth from "@/utils/auth/AvoidDuplicateLoginAuth";
import { useEffect } from "react";
import GuideIcon from "@/features/guide/GuideIcon";

function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== undefined && window.innerWidth < 768) {
      router.push("/mobile", undefined, { shallow: true });
    }
  }, []);

  const handleModal = (text: string) => {
    // setModalState(text);
    router.push(`/${text}`, undefined, { shallow: true });
  };

  const goToDash = () => {
    router.push("/teacher/dashboard", undefined, { shallow: true });
  };

  return (
    <FullScreen isColumn={true}>
      <AuthSection>
        <div style={{ position: "relative", textAlign: "right" }}>
          <GuideIcon />
          <ForestLargeLogo onClick={goToDash} src={"/images/Forest_Logo.png"} />
        </div>
        <KakaoLogin />
        <EmailAuth handleModal={handleModal} />
      </AuthSection>
    </FullScreen>
  );
}

export default avoidDuplicateLoginAuth(Home);
