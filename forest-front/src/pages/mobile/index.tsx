import Lottie from "react-lottie-player";
import sorryFolksJson from "../../../public/lottieJson/sorryFolks.json";
import { CSSProperties } from "react";
import { MobileBox, MobileLayout } from "./Mobile.style";

export default function Mobile() {
  const sorryFolksStyle: CSSProperties = {
    width: "50%",
    height: "50%",
  };
  return (
    <MobileLayout>
      <img src={"/images/Forest_Logo.png"} />
      <MobileBox>
        <Lottie loop animationData={sorryFolksJson} play style={sorryFolksStyle} />
        <p>모바일 버전은 추후 업데이트할 예정입니다.</p>
        <p>불편함을 드려 죄송합니다.</p>
      </MobileBox>
    </MobileLayout>
  );
}
