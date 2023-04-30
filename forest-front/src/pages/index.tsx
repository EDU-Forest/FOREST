// import EmailBox from "@/features/home/AuthWithEmail";
import { FullScreen } from "@/styles/container";
import { ForestLargeLogo, AuthSection } from "./index.style";
import KakaoLogin from "@/features/home/KakaoLogin";
import { useState } from "react";
import LoginModal from "@/features/home/LoginModal";
import SignupModal from "@/features/home/SignupModal";
// import AuthWithEmail from "@/features/home/AuthWithEmail";
import { EmailAuthBox } from "@/features/home/Home.style";
import EmailAuth from "@/features/home/EmailAuth";

export default function Home() {
  const [modalState, setModalState] = useState("");

  const handleModal = (text: string) => {
    setModalState(text);
  };

  const test = () => {};

  return (
    <FullScreen isColumn={true}>
      {modalState === "signup" && <SignupModal onClose={() => handleModal("")} />}
      {modalState === "login" && <LoginModal onClose={() => handleModal("")} />}
      <AuthSection>
        <ForestLargeLogo src={"/images/Forest_Logo.png"} />
        <KakaoLogin />
        <EmailAuth handleModal={handleModal} />
      </AuthSection>
    </FullScreen>
  );
}
