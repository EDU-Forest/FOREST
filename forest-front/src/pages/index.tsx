import { FullScreen } from "@/styles/container";
import { ForestLargeLogo, AuthSection } from "../features/home/index.style";
import KakaoLogin from "@/features/home/KakaoLogin";
import { useRouter } from "next/router";
import EmailAuth from "@/features/home/EmailAuth";
import avoidDuplicateLoginAuth from "@/utils/auth/AvoidDuplicateLoginAuth";
import { useEffect } from "react";

function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== undefined && window.innerWidth < 768) {
      router.push("/mobile");
    }
  }, []);

  const handleModal = (text: string) => {
    // setModalState(text);
    router.push(`/${text}`);
  };

  const goToDash = () => {
    router.push("/teacher/dashboard");
  };

  return (
    <FullScreen isColumn={true}>
      <AuthSection>
        <ForestLargeLogo onClick={goToDash} src={"/images/Forest_Logo.png"} />
        <KakaoLogin />
        <EmailAuth handleModal={handleModal} />
      </AuthSection>
    </FullScreen>
  );
}

export default avoidDuplicateLoginAuth(Home);
