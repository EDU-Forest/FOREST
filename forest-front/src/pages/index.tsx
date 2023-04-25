import EmailBox from "@/features/home/EmailBox";
import { FullScreen } from "@/styles/container";
import { ForestLargeLogo } from "./index.style";
import KakaoLogin from "@/features/home/KakaoLogin";
import { useState } from "react";
import LoginModal from "@/features/home/LoginModal";
import SignupModal from "@/features/home/SignupModal";

export default function Home() {
  const [menuSelected, setMenuSelected] = useState("");

  const openModalHandler = (text: string) => {
    setMenuSelected(text);
  };

  const closeModalHandler = () => {
    setMenuSelected("");
  };

  return (
    <FullScreen isColumn={true}>
      {menuSelected === "login" && <LoginModal onClose={closeModalHandler} />}
      {menuSelected === "signup" && <SignupModal onClose={closeModalHandler} />}
      <ForestLargeLogo src={"/images/Forest_Logo.png"} />
      <KakaoLogin />
      <EmailBox openModalHandler={openModalHandler} />
    </FullScreen>
  );
}
