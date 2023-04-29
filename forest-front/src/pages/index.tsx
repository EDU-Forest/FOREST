// import EmailBox from "@/features/home/AuthWithEmail";
import { FullScreen } from "@/styles/container";
import { ForestLargeLogo, HomeAuthSection } from "./index.style";
import KakaoLogin from "@/features/home/KakaoLogin";
import { useState } from "react";
import LoginModal from "@/features/home/LoginModal";
import SignupModal from "@/features/home/SignupModal";
// import AuthWithEmail from "@/features/home/AuthWithEmail";
import { EmailAuthBox } from "@/features/home/Home.style";
import { Text } from "@/styles/text";

export default function Home() {
  const [modalState, setModalState] = useState("");

  const handleModal = (text: string) => {
    setModalState(text);
  };

  return (
    <FullScreen isColumn={true}>
      {/* {modalState === "login" ? } */}
      <HomeAuthSection>
        <ForestLargeLogo src={"/images/Forest_Logo.png"} />
        <KakaoLogin />
        <EmailAuthBox>
          <p className="link" onClick={() => handleModal("signup")}>
            이메일 회원가입
          </p>
          <p>|</p>
          <p className="link" onClick={() => handleModal("login")}>
            이메일 로그인
          </p>
        </EmailAuthBox>
      </HomeAuthSection>
    </FullScreen>
  );
}
