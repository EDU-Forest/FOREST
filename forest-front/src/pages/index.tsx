// import EmailBox from "@/features/home/AuthWithEmail";
import { FullScreen } from "@/styles/container";
import { ForestLargeLogo, AuthSection } from "../features/home/index.style";
import KakaoLogin from "@/features/home/KakaoLogin";
import { useState } from "react";
import LoginModal from "@/features/home/LoginModal";
import SignupModal from "@/features/home/Signup";
// import AuthWithEmail from "@/features/home/AuthWithEmail";
import { EmailAuthBox } from "@/features/home/Home.style";
import { useRouter } from "next/router";
import EmailAuth from "@/features/home/EmailAuth";
import Signup from "@/features/home/Signup";
import UserForm from "@/features/home/UserForm";

export default function Home() {
  const router = useRouter();
  const [modalState, setModalState] = useState("");

  const handleModal = (text: string) => {
    setModalState(text);
  };

  const goToDash = () => {
    router.push("/teacher/dashboard");
  };

  return (
    <FullScreen isColumn={true}>
      {modalState === "signup" && <UserForm type={"signup"} onClose={() => handleModal("")} />}
      {modalState === "login" && <LoginModal onClose={() => handleModal("")} />}
      <AuthSection>
        <ForestLargeLogo onClick={goToDash} src={"/images/Forest_Logo.png"} />
        <KakaoLogin />
        <EmailAuth handleModal={handleModal} />
      </AuthSection>
    </FullScreen>
  );
}
